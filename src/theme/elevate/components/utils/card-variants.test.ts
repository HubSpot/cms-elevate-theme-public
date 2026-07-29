import { describe, test, expect } from 'vitest';
import { CardVariantType } from '../types/fields.js';
import { CARD_VARIANT_CONFIGS, isValidCardVariant, getCardVariantClassName, getCardVariantConfig, getCardVariantChoices } from './card-variants.js';

describe('card-variants utilities', () => {
  describe('CARD_VARIANT_CONFIGS', () => {
    test('should contain all expected card variant configurations', () => {
      expect(CARD_VARIANT_CONFIGS.card_variant_1).toEqual({
        label: 'Card variant 1',
        className: 'hs-elevate-card--variant-1',
      });
      expect(CARD_VARIANT_CONFIGS.card_variant_2).toEqual({
        label: 'Card variant 2',
        className: 'hs-elevate-card--variant-2',
      });
      expect(CARD_VARIANT_CONFIGS.card_variant_3).toEqual({
        label: 'Card variant 3',
        className: 'hs-elevate-card--variant-3',
      });
      expect(CARD_VARIANT_CONFIGS.card_variant_4).toEqual({
        label: 'Card variant 4',
        className: 'hs-elevate-card--variant-4',
      });
    });

    test('should have exactly 4 variant configurations', () => {
      expect(Object.keys(CARD_VARIANT_CONFIGS)).toHaveLength(4);
    });

    test('should contain all expected class name mappings', () => {
      expect(CARD_VARIANT_CONFIGS.card_variant_1.className).toBe('hs-elevate-card--variant-1');
      expect(CARD_VARIANT_CONFIGS.card_variant_2.className).toBe('hs-elevate-card--variant-2');
      expect(CARD_VARIANT_CONFIGS.card_variant_3.className).toBe('hs-elevate-card--variant-3');
      expect(CARD_VARIANT_CONFIGS.card_variant_4.className).toBe('hs-elevate-card--variant-4');
    });

    test('should have consistent data structure', () => {
      Object.entries(CARD_VARIANT_CONFIGS).forEach(([key, config]) => {
        expect(config).toHaveProperty('label');
        expect(config).toHaveProperty('className');
        expect(typeof config.label).toBe('string');
        expect(typeof config.className).toBe('string');
      });
    });
  });

  describe('isValidCardVariant', () => {
    test('should return true for valid card variants', () => {
      expect(isValidCardVariant('card_variant_1')).toBe(true);
      expect(isValidCardVariant('card_variant_2')).toBe(true);
      expect(isValidCardVariant('card_variant_3')).toBe(true);
      expect(isValidCardVariant('card_variant_4')).toBe(true);
    });

    test('should return false for invalid card variants', () => {
      expect(isValidCardVariant('card_variant_5')).toBe(false);
      expect(isValidCardVariant('invalid_variant')).toBe(false);
      expect(isValidCardVariant('')).toBe(false);
      expect(isValidCardVariant('Card_Variant_1')).toBe(false);
      expect(isValidCardVariant('card-variant-1')).toBe(false);
    });

    test('should return false for non-string inputs', () => {
      expect(isValidCardVariant(null as any)).toBe(false);
      expect(isValidCardVariant(undefined as any)).toBe(false);
      expect(isValidCardVariant(123 as any)).toBe(false);
      expect(isValidCardVariant({} as any)).toBe(false);
      expect(isValidCardVariant([] as any)).toBe(false);
    });
  });

  describe('getCardVariantClassName', () => {
    describe('with valid card variants', () => {
      test('should return correct class name for card_variant_1', () => {
        expect(getCardVariantClassName({ cardVariant: 'card_variant_1' })).toBe('hs-elevate-card--variant-1');
      });

      test('should return correct class name for card_variant_2', () => {
        expect(getCardVariantClassName({ cardVariant: 'card_variant_2' })).toBe('hs-elevate-card--variant-2');
      });

      test('should return correct class name for card_variant_3', () => {
        expect(getCardVariantClassName({ cardVariant: 'card_variant_3' })).toBe('hs-elevate-card--variant-3');
      });

      test('should return correct class name for card_variant_4', () => {
        expect(getCardVariantClassName({ cardVariant: 'card_variant_4' })).toBe('hs-elevate-card--variant-4');
      });
    });

    describe('with default variant parameter', () => {
      test('should use default variant when primary variant is invalid', () => {
        expect(getCardVariantClassName({ cardVariant: 'invalid_variant' as CardVariantType, fallbackCardVariant: 'card_variant_2' })).toBe(
          'hs-elevate-card--variant-2'
        );
        expect(getCardVariantClassName({ cardVariant: 'card_variant_5' as CardVariantType, fallbackCardVariant: 'card_variant_3' })).toBe(
          'hs-elevate-card--variant-3'
        );
      });

      test('should use card_variant_1 as fallback when default variant is also invalid', () => {
        expect(getCardVariantClassName({ cardVariant: 'invalid_variant' as CardVariantType, fallbackCardVariant: 'invalid_default' as CardVariantType })).toBe(
          'hs-elevate-card--variant-1'
        );
      });

      test('should return primary variant when both primary and default are valid', () => {
        expect(getCardVariantClassName({ cardVariant: 'card_variant_3', fallbackCardVariant: 'card_variant_2' })).toBe('hs-elevate-card--variant-3');
      });
    });

    describe('without default variant parameter', () => {
      test('should default to card_variant_1 when no default is provided and primary is invalid', () => {
        expect(getCardVariantClassName({ cardVariant: 'invalid_variant' as CardVariantType })).toBe('hs-elevate-card--variant-1');
        expect(getCardVariantClassName({ cardVariant: 'card_variant_5' as CardVariantType })).toBe('hs-elevate-card--variant-1');
      });

      test('should return primary variant when valid and no default provided', () => {
        expect(getCardVariantClassName({ cardVariant: 'card_variant_2' })).toBe('hs-elevate-card--variant-2');
        expect(getCardVariantClassName({ cardVariant: 'card_variant_4' })).toBe('hs-elevate-card--variant-4');
      });
    });

    describe('edge cases', () => {
      test('should handle empty string as primary variant', () => {
        expect(getCardVariantClassName({ cardVariant: '' as CardVariantType })).toBe('hs-elevate-card--variant-1');
      });

      test('should handle null/undefined-like inputs gracefully', () => {
        expect(getCardVariantClassName({ cardVariant: null as any })).toBe('hs-elevate-card--variant-1');
        expect(getCardVariantClassName({ cardVariant: undefined as any })).toBe('hs-elevate-card--variant-1');
      });

      test('should be case sensitive', () => {
        expect(getCardVariantClassName({ cardVariant: 'Card_Variant_1' as CardVariantType })).toBe('hs-elevate-card--variant-1');
        expect(getCardVariantClassName({ cardVariant: 'CARD_VARIANT_1' as CardVariantType })).toBe('hs-elevate-card--variant-1');
      });
    });
  });

  describe('getCardVariantConfig', () => {
    test('should return correct config for each variant', () => {
      expect(getCardVariantConfig('card_variant_1')).toEqual({
        label: 'Card variant 1',
        className: 'hs-elevate-card--variant-1',
      });

      expect(getCardVariantConfig('card_variant_2')).toEqual({
        label: 'Card variant 2',
        className: 'hs-elevate-card--variant-2',
      });

      expect(getCardVariantConfig('card_variant_3')).toEqual({
        label: 'Card variant 3',
        className: 'hs-elevate-card--variant-3',
      });

      expect(getCardVariantConfig('card_variant_4')).toEqual({
        label: 'Card variant 4',
        className: 'hs-elevate-card--variant-4',
      });
    });

    test('should return the same reference as in CARD_VARIANT_CONFIGS', () => {
      expect(getCardVariantConfig('card_variant_1')).toBe(CARD_VARIANT_CONFIGS.card_variant_1);
      expect(getCardVariantConfig('card_variant_2')).toBe(CARD_VARIANT_CONFIGS.card_variant_2);
      expect(getCardVariantConfig('card_variant_3')).toBe(CARD_VARIANT_CONFIGS.card_variant_3);
      expect(getCardVariantConfig('card_variant_4')).toBe(CARD_VARIANT_CONFIGS.card_variant_4);
    });
  });

  describe('getCardVariantChoices', () => {
    test('should return array of choice tuples', () => {
      const choices = getCardVariantChoices();
      expect(Array.isArray(choices)).toBe(true);
      expect(choices).toHaveLength(4);

      // Each choice should be a tuple [key, label]
      choices.forEach(choice => {
        expect(Array.isArray(choice)).toBe(true);
        expect(choice).toHaveLength(2);
        expect(typeof choice[0]).toBe('string');
        expect(typeof choice[1]).toBe('string');
      });
    });

    test('should contain all expected choices', () => {
      const choices = getCardVariantChoices();
      const expectedChoices = [
        ['card_variant_1', 'Card variant 1'],
        ['card_variant_2', 'Card variant 2'],
        ['card_variant_3', 'Card variant 3'],
        ['card_variant_4', 'Card variant 4'],
      ];

      expect(choices).toEqual(expect.arrayContaining(expectedChoices));
      expect(choices).toHaveLength(expectedChoices.length);
    });

    test('should return choices in a consistent format', () => {
      const choices = getCardVariantChoices();

      choices.forEach(([key, label]) => {
        expect(key).toMatch(/^card_variant_\d+$/);
        expect(label).toMatch(/^Card variant \d+$/);
        expect(isValidCardVariant(key)).toBe(true);
      });
    });
  });
});
