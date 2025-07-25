import { describe, it, expect } from 'vitest';
import { generateInlineFieldsToken } from './generate-inline-field-token.js';

describe('generateInlineFieldsToken', () => {
  it('should generate a token with module prefix and dot notation', () => {
    expect(generateInlineFieldsToken('myModule', 'myField')).toBe('module.myModule.myField');
  });

  it('should handle module names with underscores', () => {
    expect(generateInlineFieldsToken('my_module', 'field_name')).toBe('module.my_module.field_name');
  });

  it('should handle module names with hyphens', () => {
    expect(generateInlineFieldsToken('my-module', 'field-name')).toBe('module.my-module.field-name');
  });

  it('should handle nested field paths', () => {
    expect(generateInlineFieldsToken('myModule', 'section.subsection.field')).toBe('module.myModule.section.subsection.field');
  });

  it('should handle numeric values in module and field names', () => {
    expect(generateInlineFieldsToken('module123', 'field456')).toBe('module.module123.field456');
  });
});
