import {
  limitedColorDefaults,
  themeLightSectionTextColors,
  themeDarkSectionTextColors,
  themeLightSectionAccentColors,
  themeDarkSectionAccentColors,
  themeLightSectionBackgroundColors,
  themeDarkSectionBackgroundColors,
} from './theme-color-sets.js';
import { describe, test, expect } from 'vitest';

describe('getLimitedColorDefaults', () => {
  test('should return theme colors when requested', () => {
    const result = limitedColorDefaults.themeColors;

    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual([...themeLightSectionAccentColors, ...themeDarkSectionAccentColors]);
  });

  test('should return theme section text colors when requested', () => {
    const result = limitedColorDefaults.themeSectionTextColors;

    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual([...themeLightSectionTextColors, ...themeDarkSectionTextColors]);
  });

  test('should return theme section background colors when requested', () => {
    const result = limitedColorDefaults.themeSectionBackgroundColors;

    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual([...themeLightSectionBackgroundColors, ...themeDarkSectionBackgroundColors]);
  });

  test('should return empty array for unknown color set', () => {
    const result = limitedColorDefaults.unknownColorSet;

    expect(result).toBeUndefined();
  });
});
