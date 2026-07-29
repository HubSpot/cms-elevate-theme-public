import { describe, it, expect } from 'vitest';
import { getAlignmentFieldCss, getBorderFieldCss } from './style-fields.js';

describe('getAlignmentFieldCss', () => {
  it('should return correct CSS for horizontal and vertical alignment', () => {
    const fieldValue: { horizontal_align?: 'CENTER' | 'LEFT' | 'RIGHT'; vertical_align?: 'MIDDLE' | 'TOP' | 'BOTTOM' } = {
      horizontal_align: 'CENTER',
      vertical_align: 'MIDDLE',
    };
    const expectedOutput = {
      justifyContent: 'center',
      alignItems: 'center',
    };
    const result = getAlignmentFieldCss(fieldValue);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle missing horizontal alignment', () => {
    const fieldValue: { vertical_align: 'MIDDLE' | 'TOP' | 'BOTTOM' } = {
      vertical_align: 'TOP',
    };
    const expectedOutput = {
      justifyContent: null,
      alignItems: 'start',
    };
    const result = getAlignmentFieldCss(fieldValue);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle missing vertical alignment', () => {
    const fieldValue: { horizontal_align: 'CENTER' | 'LEFT' | 'RIGHT' } = {
      horizontal_align: 'RIGHT',
    };
    const expectedOutput = {
      justifyContent: 'flex-end',
      alignItems: null,
    };
    const result = getAlignmentFieldCss(fieldValue);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle null fieldValue', () => {
    const fieldValue = null;
    const expectedOutput = {
      justifyContent: null,
      alignItems: null,
    };
    const result = getAlignmentFieldCss(fieldValue);
    expect(result).toEqual(expectedOutput);
  });
});

describe('getBorderFieldCss', () => {
  it('should return correct CSS for border style, width, and color', () => {
    const borderStyle = {
      top: {
        style: 'dashed',
        width: { value: 2, units: 'px' },
        color: 'red',
      },
    };

    const result = getBorderFieldCss(borderStyle);
    expect(result).toEqual('2px dashed red');
  });

  it('should handle missing border style, returning a blank string', () => {
    const borderStyle = {};

    const result = getBorderFieldCss(borderStyle);
    expect(result).toEqual('');
  });

  it('should handle missing border width, returning a blank string', () => {
    const borderStyle = {
      top: {
        style: 'solid',
        color: 'blue',
      },
    };

    const result = getBorderFieldCss(borderStyle);
    expect(result).toEqual('');
  });
});
