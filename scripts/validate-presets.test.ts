import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import {
  yellow,
  red,
  green,
  traverseFields,
  traversePreset,
  comparePresetToSchema,
  parseFile,
  detectPresetChanges,
  displayGroupedValidationResults,
  createTable,
} from './validate-presets.js';

describe('Color utility functions', () => {
  const originalIsTTY = process.stdout.isTTY;
  const originalNoColor = process.env.NO_COLOR;

  afterEach(() => {
    Object.defineProperty(process.stdout, 'isTTY', {
      value: originalIsTTY,
      writable: true,
      configurable: true,
    });
    if (originalNoColor !== undefined) {
      process.env.NO_COLOR = originalNoColor;
    } else {
      delete process.env.NO_COLOR;
    }
  });

  it('should output ANSI codes when colors are enabled', () => {
    Object.defineProperty(process.stdout, 'isTTY', {
      value: true,
      writable: true,
      configurable: true,
    });
    delete process.env.NO_COLOR;

    expect(yellow('test')).toBe('\x1b[33mtest\x1b[0m');
    expect(red('test')).toBe('\x1b[31mtest\x1b[0m');
    expect(green('test')).toBe('\x1b[32mtest\x1b[0m');
  });

  it('should return plain text when NO_COLOR is set', () => {
    Object.defineProperty(process.stdout, 'isTTY', {
      value: true,
      writable: true,
      configurable: true,
    });
    process.env.NO_COLOR = '1';

    expect(yellow('test')).toBe('test');
    expect(red('test')).toBe('test');
    expect(green('test')).toBe('test');
  });
});

describe('traverseFields', () => {
  it('should extract simple and nested group fields', () => {
    const fields = [
      {
        name: 'primaryColor',
        type: 'color',
      },
      {
        name: 'typography',
        type: 'group',
        children: [
          {
            name: 'fontSize',
            type: 'number',
          },
        ],
      },
    ];

    const result = traverseFields(fields);
    expect(result.size).toBe(2);
    expect(result.get('primaryColor')).toEqual({
      type: 'color',
      inheritedValue: null,
      defaultValue: null,
    });
    expect(result.get('typography.fontSize')).toEqual({
      type: 'number',
      inheritedValue: null,
      defaultValue: null,
    });
  });

  it('should capture inherited values and defaults', () => {
    const fields = [
      {
        name: 'primaryColor',
        type: 'color',
        inherited_value: {
          property_value_paths: {
            color: 'theme.colors.primary',
          },
        },
      },
      {
        name: 'fontSize',
        type: 'number',
        default: 16,
      },
    ];

    const result = traverseFields(fields);
    expect(result.get('primaryColor')).toEqual({
      type: 'color',
      inheritedValue: {
        color: 'theme.colors.primary',
      },
      defaultValue: null,
    });
    expect(result.get('fontSize')).toEqual({
      type: 'number',
      inheritedValue: null,
      defaultValue: 16,
    });
  });
});

describe('traversePreset', () => {
  it('should extract values from simple and nested presets', () => {
    const preset = {
      primaryColor: '#000000',
      typography: {
        fontSize: 16,
      },
    };

    const result = traversePreset(preset);
    expect(result.size).toBe(2);
    expect(result.get('primaryColor')).toBe('#000000');
    expect(result.get('typography.fontSize')).toBe(16);
  });

  it('should unwrap styles wrapper and skip name and label fields', () => {
    const preset = {
      name: 'test-preset',
      label: 'Test Preset',
      styles: {
        primaryColor: '#000000',
        fontSize: 16,
      },
    };

    const result = traversePreset(preset);
    expect(result.size).toBe(2);
    expect(result.get('primaryColor')).toBe('#000000');
    expect(result.get('fontSize')).toBe(16);
    expect(result.has('name')).toBe(false);
    expect(result.has('label')).toBe(false);
  });
});

describe('comparePresetToSchema', () => {
  it('should identify valid fields, orphaned fields, and missing fields', () => {
    const presetValues = new Map<string, unknown>([
      ['primaryColor', '#000000'],
      ['orphanedField', 'value'],
    ]);

    const schemaFields = new Map([
      ['primaryColor', { type: 'color', inheritedValue: null, defaultValue: null }],
      ['fontSize', { type: 'number', inheritedValue: null, defaultValue: null }],
      [
        'themeColor',
        {
          type: 'color',
          inheritedValue: { color: 'theme.colors.primary' },
          defaultValue: null,
        },
      ],
    ]);

    const result = comparePresetToSchema(presetValues, schemaFields);
    expect(result.validFields).toEqual(['primaryColor']);
    expect(result.orphanedFields).toContain('orphanedField');
    expect(result.missingRequiredFields).toContain('fontSize');
    expect(result.missingInheritedFields).toContain('themeColor');
  });

  it('should handle font and color subfields correctly', () => {
    const presetValues = new Map<string, unknown>([
      ['font.size', 16],
      ['primaryColor.color', '#000000'],
      ['primaryColor.opacity', 1],
    ]);

    const schemaFields = new Map([
      ['font', { type: 'font', inheritedValue: null, defaultValue: null }],
      ['primaryColor', { type: 'color', inheritedValue: null, defaultValue: null }],
    ]);

    const result = comparePresetToSchema(presetValues, schemaFields);
    expect(result.validFields).toContain('font.size');
    expect(result.validFields).toContain('primaryColor.color');
    expect(result.validFields).toContain('primaryColor.opacity');
    expect(result.orphanedFields).toEqual([]);
  });
});

describe('Error handling', () => {
  describe('parseFile', () => {
    it('should throw error for invalid JSON', () => {
      const tempFile = path.join(os.tmpdir(), 'temp-invalid.json');

      try {
        fs.writeFileSync(tempFile, '{ invalid json }', 'utf8');
        expect(() => parseFile(tempFile, data => data)).toThrow();
      } finally {
        if (fs.existsSync(tempFile)) {
          fs.unlinkSync(tempFile);
        }
      }
    });

    it('should successfully parse valid JSON', () => {
      const tempFile = path.join(os.tmpdir(), 'temp-valid.json');

      try {
        const testData = { test: 'value', number: 123 };
        fs.writeFileSync(tempFile, JSON.stringify(testData), 'utf8');

        const result = parseFile(tempFile, data => data);
        expect(result).toEqual(testData);
      } finally {
        if (fs.existsSync(tempFile)) {
          fs.unlinkSync(tempFile);
        }
      }
    });
  });

  describe('detectPresetChanges', () => {
    it('should throw error when presets directory does not exist', () => {
      const nonExistentDir = path.join(os.tmpdir(), 'non-existent-presets');
      const schemaFields = new Map();

      expect(() => {
        detectPresetChanges(nonExistentDir, schemaFields);
      }).toThrow('Presets directory not found');
    });

    it('should process valid preset files', () => {
      const tempDir = path.join(os.tmpdir(), 'temp-presets-valid');
      const tempFile = path.join(tempDir, 'valid.json');
      const schemaFields = new Map([['primaryColor', { type: 'color', inheritedValue: null, defaultValue: null }]]);

      try {
        fs.mkdirSync(tempDir, { recursive: true });
        const presetData = {
          styles: {
            primaryColor: '#000000',
          },
        };
        fs.writeFileSync(tempFile, JSON.stringify(presetData), 'utf8');

        const result = detectPresetChanges(tempDir, schemaFields);

        expect(result).toHaveProperty('valid');
        expect(result.valid.validFields).toContain('primaryColor');
      } finally {
        if (fs.existsSync(tempFile)) {
          fs.unlinkSync(tempFile);
        }
        if (fs.existsSync(tempDir)) {
          fs.rmSync(tempDir, { recursive: true, force: true });
        }
      }
    });
  });
});

describe('createTable', () => {
  it('should create a table with all data present', () => {
    const headers = ['Name', 'Age'];
    const rows = [
      ['Alice', '25'],
      ['Bob', '30'],
    ];

    const result = createTable(headers, rows);

    // Verify all headers are present
    expect(result).toContain('Name');
    expect(result).toContain('Age');

    // Verify all row data is present
    expect(result).toContain('Alice');
    expect(result).toContain('Bob');
    expect(result).toContain('25');
    expect(result).toContain('30');

    // Verify table structure elements
    expect(result).toContain('│');
    expect(result).toContain('─');
  });

  it('should include all data when headers and values have different lengths', () => {
    const headers = ['Short', 'Very Long Header'];
    const rows = [
      ['A', 'B'],
      ['VeryLongValue', 'C'],
    ];

    const result = createTable(headers, rows);

    expect(result).toContain('Short');
    expect(result).toContain('Very Long Header');
    expect(result).toContain('VeryLongValue');
    expect(result).toContain('│');
  });

  it('should handle empty rows', () => {
    const headers = ['Field', 'Value'];
    const rows: string[][] = [];

    const result = createTable(headers, rows);

    expect(result).toContain('Field');
    expect(result).toContain('Value');
    expect(result).toContain('─');
  });
});

describe('displayGroupedValidationResults', () => {
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('should return false when all presets are up-to-date', () => {
    const allPresetChanges = {
      preset1: {
        orphanedFields: [],
        missingInheritedFields: ['inheritedField'],
        missingRequiredFields: [],
        validFields: ['field1'],
      },
      preset2: {
        orphanedFields: [],
        missingInheritedFields: [],
        missingRequiredFields: [],
        validFields: ['field2'],
      },
    };

    const result = displayGroupedValidationResults(allPresetChanges);
    expect(result).toBe(false);
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('✓ All presets are up-to-date'));
  });

  it('should return true and display grouped errors across multiple presets', () => {
    const allPresetChanges = {
      preset1: {
        orphanedFields: [],
        missingInheritedFields: [],
        missingRequiredFields: ['fontSize', 'color'],
        validFields: [],
      },
      preset2: {
        orphanedFields: [],
        missingInheritedFields: [],
        missingRequiredFields: ['padding'],
        validFields: [],
      },
    };

    const result = displayGroupedValidationResults(allPresetChanges);
    expect(result).toBe(true);
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Fields requiring manual values'));

    // Check that the table contains the expected data
    const tableCalls = consoleLogSpy.mock.calls.map(call => call[0]);
    const tableOutput = tableCalls.find(call => typeof call === 'string' && call.includes('fontSize'));
    expect(tableOutput).toContain('fontSize');
    expect(tableOutput).toContain('color');
    expect(tableOutput).toContain('padding');
    expect(tableOutput).toContain('preset1');
    expect(tableOutput).toContain('preset2');
  });

  it('should return false and display grouped warnings across multiple presets', () => {
    const allPresetChanges = {
      preset1: {
        orphanedFields: ['oldField1', 'oldField2'],
        missingInheritedFields: [],
        missingRequiredFields: [],
        validFields: ['validField'],
      },
      preset2: {
        orphanedFields: ['oldField3'],
        missingInheritedFields: [],
        missingRequiredFields: [],
        validFields: ['validField2'],
      },
    };

    const result = displayGroupedValidationResults(allPresetChanges);
    expect(result).toBe(false);
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Orphaned fields in preset'));

    // Check that the table contains the expected data
    const tableCalls = consoleLogSpy.mock.calls.map(call => call[0]);
    const tableOutput = tableCalls.find(call => typeof call === 'string' && call.includes('oldField1'));
    expect(tableOutput).toContain('oldField1');
    expect(tableOutput).toContain('oldField2');
    expect(tableOutput).toContain('oldField3');
    expect(tableOutput).toContain('preset1');
    expect(tableOutput).toContain('preset2');
  });

  it('should display both errors and warnings grouped separately', () => {
    const allPresetChanges = {
      preset1: {
        orphanedFields: ['orphanedField'],
        missingInheritedFields: [],
        missingRequiredFields: ['requiredField'],
        validFields: [],
      },
      preset2: {
        orphanedFields: [],
        missingInheritedFields: [],
        missingRequiredFields: [],
        validFields: ['validField'],
      },
    };

    const result = displayGroupedValidationResults(allPresetChanges);
    expect(result).toBe(true);
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('✓ Up-to-date presets:'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('preset2'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Fields requiring manual values'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Orphaned fields in preset'));

    // Check that the tables contain the expected data
    const tableCalls = consoleLogSpy.mock.calls.map(call => call[0]);
    const errorTable = tableCalls.find(call => typeof call === 'string' && call.includes('requiredField'));
    const warningTable = tableCalls.find(call => typeof call === 'string' && call.includes('orphanedField'));
    expect(errorTable).toContain('requiredField');
    expect(warningTable).toContain('orphanedField');
  });
});
