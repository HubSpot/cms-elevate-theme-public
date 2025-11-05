import * as fs from 'fs';
import * as path from 'path';

interface FieldMetadata {
  type: string;
  inheritedValue: Record<string, string> | null;
  defaultValue: unknown;
}

interface FieldChanges {
  added: string[];
  removed: string[];
  unchanged: string[];
}

interface PresetChanges {
  [presetName: string]: FieldChanges;
}

interface Field {
  name?: string;
  type: string;
  children?: Field[];
  inherited_value?: {
    property_value_paths?: Record<string, string>;
  };
  default?: unknown;
}

interface Preset {
  name?: string;
  label?: string;
  styles?: Record<string, unknown>;
  [key: string]: unknown;
}

function isPresetObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isFieldArray(value: unknown): value is Field[] {
  return Array.isArray(value);
}

/**
 * Parses a JSON file and applies a traversal function to extract data
 */
function parseFile<T>(filePath: string, traverseFn: (data: unknown) => T): T {
  const content = fs.readFileSync(filePath, 'utf8');
  const data: unknown = JSON.parse(content);
  return traverseFn(data);
}

/**
 * Extracts all fields from the fields schema into a flat map.
 * Returns only fields that hold actual values, excluding structural groups.
 */
function traverseFields(fields: Field[] | Field, basePath: string = '', fieldMap: Map<string, FieldMetadata> = new Map()): Map<string, FieldMetadata> {
  const fieldsArray = Array.isArray(fields) ? fields : [fields];

  for (const field of fieldsArray) {
    if (!field.name) continue;

    const fieldPath = basePath ? `${basePath}.${field.name}` : field.name;
    const isGroup = field.type === 'group' && Array.isArray(field.children) && field.children.length > 0;

    if (isGroup && field.children) {
      traverseFields(field.children, fieldPath, fieldMap);
      continue;
    }

    fieldMap.set(fieldPath, {
      type: field.type,
      inheritedValue: field.inherited_value?.property_value_paths ?? null,
      defaultValue: field.default ?? null,
    });
  }

  return fieldMap;
}

/**
 * Recursively traverses a preset object and extracts all field values into a flat map.
 */
function traversePreset(preset: unknown, basePath: string = '', fieldValues: Map<string, unknown> = new Map()): Map<string, unknown> {
  if (!isPresetObject(preset)) {
    return fieldValues;
  }

  const { styles: presetStyles } = preset;

  if (!basePath && presetStyles !== undefined) {
    return traversePreset(presetStyles, '', fieldValues);
  }

  for (const [styleKey, styleValue] of Object.entries(preset)) {
    if (styleKey === 'name' || styleKey === 'label') {
      continue;
    }

    const fieldPath = basePath ? `${basePath}.${styleKey}` : styleKey;
    const isNestedObject = isPresetObject(styleValue);

    if (isNestedObject) {
      traversePreset(styleValue, fieldPath, fieldValues);
    } else {
      fieldValues.set(fieldPath, styleValue);
    }
  }

  return fieldValues;
}

/**
 * Checks if a preset field path matches a schema field
 */
function isFieldInSchema(presetFieldPath: string, schemaFields: Map<string, FieldMetadata>): boolean {
  // Check if the exact field path exists in schema
  if (schemaFields.has(presetFieldPath)) {
    return true;
  }

  /* Font and color fields are complex types that get expanded into subfields in presets
   * (e.g., font.size, font.weight, color.color, color.opacity), so we need to check
   * if the preset field is a subfield of these complex types  const pathParts = presetFieldPath.split('.');
   */
  const pathParts = presetFieldPath.split('.');

  for (let depth = pathParts.length - 1; depth >= 0; depth--) {
    const parentPath = pathParts.slice(0, depth).join('.');

    if (schemaFields.has(parentPath)) {
      const parentField = schemaFields.get(parentPath);
      const isFontOrColorField = parentField?.type === 'font' || parentField?.type === 'color';

      if (isFontOrColorField) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Compares preset fields against the fields.json schema to detect changes.
 * Returns fields that are in the preset but not in the schema (added),
 * fields in the schema but not in the preset (missing from preset), etc.
 */
function comparePresetToSchema(presetValues: Map<string, unknown>, schemaFields: Map<string, FieldMetadata>): FieldChanges {
  const changes: FieldChanges = {
    added: [],
    removed: [],
    unchanged: [],
  };

  for (const fieldPath of presetValues.keys()) {
    if (isFieldInSchema(fieldPath, schemaFields)) {
      changes.unchanged.push(fieldPath);
    } else {
      changes.added.push(fieldPath);
    }
  }

  // Check for schema fields that are missing from the preset
  for (const [fieldPath, fieldMeta] of schemaFields.entries()) {
    const hasMatchingPresetValue = Array.from(presetValues.keys()).some(presetPath => {
      if (presetPath === fieldPath) return true;
      if (fieldMeta.type === 'font' || fieldMeta.type === 'color') {
        return presetPath.startsWith(fieldPath + '.');
      }
      return false;
    });

    if (!hasMatchingPresetValue) {
      // Field exists in schema but not in preset - preset needs to be updated
      changes.removed.push(fieldPath);
    }
  }

  return changes;
}

/**
 * Detects changes in all presets by comparing them against the fields.json schema.
 */
function detectPresetChanges(presetsDir: string, fieldsSchema: Map<string, FieldMetadata>): PresetChanges {
  const presetChanges: PresetChanges = {};

  if (!fs.existsSync(presetsDir)) {
    throw new Error(`Presets directory not found: ${presetsDir}`);
  }

  const presetFiles = fs.readdirSync(presetsDir).filter(f => f.endsWith('.json'));

  for (const filename of presetFiles) {
    const presetPath = path.join(presetsDir, filename);
    const presetName = filename.replace('.json', '');

    try {
      const presetValues = parseFile(presetPath, traversePreset);
      const changes = comparePresetToSchema(presetValues, fieldsSchema);
      presetChanges[presetName] = changes;
    } catch (error) {
      console.error(`Error processing preset ${presetName}:`, error);
      presetChanges[presetName] = {
        added: [],
        removed: [],
        unchanged: [],
      };
    }
  }

  return presetChanges;
}

/**
 * Main function that detects changes between presets and fields.json schema
 */
function main(): void {
  const fieldsJsonPath = path.join(__dirname, '../src/unified-theme/fields.json');
  const presetsDir = path.join(__dirname, '../src/unified-theme/presets');

  const fieldMap = parseFile(fieldsJsonPath, (data: unknown) => {
    if (!isFieldArray(data)) {
      throw new Error('Invalid fields.json format: expected an array of fields');
    }
    return traverseFields(data);
  });
  console.log(`Total fields found in schema: ${fieldMap.size}\n`);

  const presetChanges = detectPresetChanges(presetsDir, fieldMap);

  for (const [presetName, changes] of Object.entries(presetChanges)) {
    console.log(`\n=== ${presetName} ===`);

    if (changes.added.length > 0) {
      console.log(`\nFields in preset but NOT in schema (${changes.added.length}):`);
      changes.added.forEach(field => console.log(`  + ${field}`));
    }

    if (changes.removed.length > 0) {
      console.log(`\nFields in schema but NOT in preset (${changes.removed.length}):`);
      changes.removed.forEach(field => console.log(`  - ${field}`));
    }

    console.log(`\nMatching fields: ${changes.unchanged.length}`);
  }
}

if (require.main === module) {
  main();
}

export { parseFile, traverseFields, traversePreset, detectPresetChanges, comparePresetToSchema };
