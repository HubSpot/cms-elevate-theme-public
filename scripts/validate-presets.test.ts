import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import {
  yellow,
  red,
  green,
  displayPresetNotifications,
  traverseFields,
  traversePreset,
  comparePresetToSchema,
  parseFile,
  detectPresetChanges,
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

describe('displayPresetNotifications', () => {
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('should return false for up-to-date presets', () => {
    const changes = {
      orphanedFields: [],
      missingInheritedFields: ['inheritedField'],
      missingRequiredFields: [],
      validFields: ['field1'],
    };

    const fieldMap = new Map([['field1', { type: 'string', inheritedValue: null, defaultValue: null }]]);

    const result = displayPresetNotifications('test-preset', changes, fieldMap);
    expect(result).toBe(false);
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('✓ Preset is up-to-date'));
  });

  it('should return true and display missing required fields with defaults', () => {
    const changes = {
      orphanedFields: [],
      missingInheritedFields: [],
      missingRequiredFields: ['fontSize'],
      validFields: [],
    };

    const fieldMap = new Map([['fontSize', { type: 'number', inheritedValue: null, defaultValue: 16 }]]);

    const result = displayPresetNotifications('test-preset', changes, fieldMap);
    expect(result).toBe(true);
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Fields requiring manual values'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Default: 16'));
  });

  it('should display orphaned fields as warnings', () => {
    const changes = {
      orphanedFields: ['oldField1'],
      missingInheritedFields: [],
      missingRequiredFields: [],
      validFields: ['primaryColor'],
    };

    const fieldMap = new Map([['primaryColor', { type: 'color', inheritedValue: null, defaultValue: null }]]);

    const result = displayPresetNotifications('test-preset', changes, fieldMap);
    expect(result).toBe(false);
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Orphaned fields in preset'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('oldField1'));
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
