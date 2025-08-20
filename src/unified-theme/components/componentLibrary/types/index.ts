import React from 'react';
import { BaseField } from '@hubspot/cms-components/fields';

// ============================================================================
// CSS/STYLE TYPES
// ============================================================================

// Typography types
export type TextAlign = 'left' | 'center' | 'right' | 'justify';
export type TextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize';
export type FontWeight = 'lighter' | 'normal' | 'bold' | 'bolder' | number;
export type FontStyle = 'normal' | 'italic' | 'oblique';

// Style-related props that generate CSS variables
const STYLE_COMPONENT_PROPS = {
  // CSS property props
  color: String,
  backgroundColor: String,
  borderColor: String,
  borderWidth: [String, Number] as const,
  borderStyle: String,
  borderRadius: [String, Number] as const,
  fontSize: [String, Number] as const,
  fontStyle: String as () => FontStyle,
  fontWeight: String as () => FontWeight,
  fontFamily: String,
  lineHeight: [String, Number] as const,
  letterSpacing: [String, Number] as const,
  textAlign: String as () => TextAlign,
  textTransform: String as () => TextTransform,
  textDecoration: String,
  cursor: String,
  opacity: Number,
  boxShadow: String,
  transition: String,

  // Hover state props
  hoverColor: String,
  hoverBackgroundColor: String,
  hoverBorderColor: String,
  hoverOpacity: Number,
  hoverTransform: String,
  hoverBoxShadow: String,

  // Space props (margin/padding) - flexible user-defined values
  marginTop: [String, Number] as const,
  marginBottom: [String, Number] as const,
  marginLeft: [String, Number] as const,
  marginRight: [String, Number] as const,
  margin: [String, Number] as const,
  paddingTop: [String, Number] as const,
  paddingBottom: [String, Number] as const,
  paddingLeft: [String, Number] as const,
  paddingRight: [String, Number] as const,
  padding: [String, Number] as const,

  // Position props
  position: String as () =>
    | 'static'
    | 'relative'
    | 'absolute'
    | 'fixed'
    | 'sticky',
  top: [String, Number] as const,
  right: [String, Number] as const,
  bottom: [String, Number] as const,
  left: [String, Number] as const,
  zIndex: Number,

  // Size props
  width: [String, Number] as const,
  height: [String, Number] as const,
  minWidth: [String, Number] as const,
  minHeight: [String, Number] as const,
  maxWidth: [String, Number] as const,
  maxHeight: [String, Number] as const,

  // Display props
  display: String as () =>
    | 'block'
    | 'inline'
    | 'inline-block'
    | 'flex'
    | 'inline-flex'
    | 'grid'
    | 'none',
} as const;

// Export style props for automated CSS variable generation
export { STYLE_COMPONENT_PROPS };

// ============================================================================
// BASE COMPONENT CONFIGURATION
// ============================================================================

// Helper type to convert config to proper TypeScript types
type ConfigToType<T> = T extends readonly [infer A, infer B]
  ? A extends StringConstructor
    ? B extends NumberConstructor
      ? string | number
      : never
    : never
  : T extends StringConstructor
  ? string
  : T extends NumberConstructor
  ? number
  : T extends ObjectConstructor
  ? React.CSSProperties
  : T extends () => infer U
  ? U
  : never;

// Single source of truth for all base component props
const BASE_COMPONENT_PROPS_CONFIG = {
  // Basic element props
  className: String,
  style: Object as () => React.CSSProperties,

  // Spread in all style props
  ...STYLE_COMPONENT_PROPS,

  // Testing props
  'data-test-id': String,

  // Accessibility props
  role: String,
  'aria-label': String,
  'aria-labelledby': String,
  'aria-describedby': String,
} as const;

// Generate TypeScript type from the config
export type BaseComponentProps = {
  [K in keyof typeof BASE_COMPONENT_PROPS_CONFIG]?: ConfigToType<
    (typeof BASE_COMPONENT_PROPS_CONFIG)[K]
  >;
};

// Generate runtime keys directly from the config - exported for use in utils
export const BASE_COMPONENT_PROP_KEYS = new Set(
  Object.keys(BASE_COMPONENT_PROPS_CONFIG) as (keyof BaseComponentProps)[]
);

// ============================================================================
// COMPONENT-SPECIFIC TYPES
// ============================================================================

// Common color values that could be used across components
export type ColorVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'error';

// Heading level type for heading components
export type HeadingLevelType = 1 | 2 | 3 | 4 | 5 | 6;

// ============================================================================
// CMS INTEGRATION TYPES
// ============================================================================

// Extract visibility types from BaseField for CMS field integration
export type VisibilityRules = BaseField['visibilityRules'];
export type Visibility = BaseField['visibility'];

// ============================================================================
// VARIANT SYSTEM TYPES
// ============================================================================

// Individual variant option with label and associated props
export interface VariantOption {
  choiceFieldOptionLabel: string;
  props: Partial<BaseComponentProps>;
}

// Collection of variant options for a single dimension
export interface VariantDimension {
  [key: string]: VariantOption;
}

// Complete variant configuration with dimensions and defaults
export interface VariantConfig {
  dimensions: Record<string, VariantDimension>;
  defaults?: Record<string, string>;
}

// Extracts variant prop types from a variant config
// Results in: { variant?: 'primary' | 'secondary', size?: 'small' | 'large', ... }
export type ExtractVariantProps<T extends VariantConfig> = {
  [K in keyof T['dimensions']]?: keyof T['dimensions'][K];
};
