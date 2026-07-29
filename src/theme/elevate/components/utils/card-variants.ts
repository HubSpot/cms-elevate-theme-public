import { CardVariantType, CardVariantLabelType, CardVariantClassNameType } from '../types/fields.js';

export interface CardVariantConfig {
  label: CardVariantLabelType;
  className: CardVariantClassNameType;
}

export interface CardVariantOptions {
  cardVariant: CardVariantType;
  fallbackCardVariant?: CardVariantType;
}

export const CARD_VARIANT_CONFIGS: {
  [K in CardVariantType]: CardVariantConfig;
} = {
  card_variant_1: {
    label: 'Card variant 1',
    className: 'hs-elevate-card--variant-1',
  },
  card_variant_2: {
    label: 'Card variant 2',
    className: 'hs-elevate-card--variant-2',
  },
  card_variant_3: {
    label: 'Card variant 3',
    className: 'hs-elevate-card--variant-3',
  },
  card_variant_4: {
    label: 'Card variant 4',
    className: 'hs-elevate-card--variant-4',
  },
};

// Validates if a given variant is a valid card variant
export function isValidCardVariant(variant: string): variant is CardVariantType {
  return CARD_VARIANT_CONFIGS.hasOwnProperty(variant);
}

// Generates CSS class name for card variants with fallback support
export function getCardVariantClassName(options: CardVariantOptions): string {
  const { cardVariant, fallbackCardVariant = 'card_variant_1' } = options;

  if (!isValidCardVariant(fallbackCardVariant) && !isValidCardVariant(cardVariant)) {
    return CARD_VARIANT_CONFIGS.card_variant_1.className;
  }
  const selectedCardVariantClass = CARD_VARIANT_CONFIGS[cardVariant]?.className;
  const fallbackClass = CARD_VARIANT_CONFIGS[fallbackCardVariant].className;

  return selectedCardVariantClass || fallbackClass;
}

export function getCardVariantConfig(variant: CardVariantType): CardVariantConfig {
  return CARD_VARIANT_CONFIGS[variant];
}

export function getCardVariantChoices(): [CardVariantType, string][] {
  return Object.entries(CARD_VARIANT_CONFIGS).map(([key, { label }]) => [key as CardVariantType, label]);
}
