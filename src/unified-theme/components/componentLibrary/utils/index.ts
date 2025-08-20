import React from 'react';
import {
  Visibility,
  VisibilityRules,
  BaseComponentProps,
  BASE_COMPONENT_PROP_KEYS,
  STYLE_COMPONENT_PROPS,
  VariantConfig,
  ExtractVariantProps,
} from '../types/index.js';
import { AdvancedVisibility } from '@hubspot/cms-components/fields';

// =============================================================================
// VALUE PROCESSING UTILITIES
// =============================================================================

/**
 * Converts numeric values to string format, leaves string values unchanged
 * Note: Numbers are converted to plain strings without units (by design)
 *
 * @param value - The value to convert to string format
 * @returns String representation of the value
 *
 * @example
 * convertValueToString(16) → "16"
 * convertValueToString("2rem") → "2rem"
 * convertValueToString("100%") → "100%"
 */
export const convertValueToString = (value: string | number): string => {
  if (typeof value === 'number') {
    return `${value}`;
  }
  return value;
};

// =============================================================================
// CMS INTEGRATION UTILITIES
// =============================================================================

/**
 * Configures visibility rules for HubSpot CMS fields
 *
 * @param visibility - The visibility configuration object
 * @param visibilityRules - Type of visibility rules to use ('SIMPLE' or 'ADVANCED')
 * @returns Visibility configuration object for CMS fields
 *
 * @example
 * // Simple visibility
 * setFieldVisibility(simpleConfig, 'SIMPLE')
 * → { visibilityRules: 'SIMPLE', visibility: simpleConfig }
 *
 * // Advanced visibility
 * setFieldVisibility(advancedConfig, 'ADVANCED')
 * → { visibilityRules: 'ADVANCED', advancedVisibility: advancedConfig }
 *
 * // No visibility
 * setFieldVisibility() → {}
 */
export const setFieldVisibility = (
  visibility?: Visibility | AdvancedVisibility,
  visibilityRules?: VisibilityRules
) => {
  if (!visibility) {
    return {}; // No visibility rules when no visibility config is provided
  }

  if (visibilityRules === 'ADVANCED') {
    return {
      visibilityRules: 'ADVANCED' as const,
      advancedVisibility: visibility as AdvancedVisibility,
    };
  } else {
    return {
      visibilityRules: 'SIMPLE' as const,
      visibility: visibility as Visibility,
    };
  }
};

// =============================================================================
// CSS GENERATION UTILITIES
// =============================================================================

/**
 * Converts camelCase strings to kebab-case format
 * @param camelCaseString - The camelCase string to convert
 * @returns The kebab-case formatted string
 *
 * @example
 * convertToKebabCase('fontSize') → 'font-size'
 * convertToKebabCase('backgroundColor') → 'background-color'
 */
export const convertToKebabCase = (camelCaseString: string): string =>
  camelCaseString.replace(
    /[A-Z]/g,
    capitalLetter => `-${capitalLetter.toLowerCase()}`
  );

/**
 * Determines if a value should be converted to string format
 * Returns true for numbers or numeric strings (e.g., "16")
 * @param value - The value to evaluate
 * @returns True if the value needs string conversion
 */
const shouldConvertToString = (value: string | number): boolean =>
  typeof value === 'number' ||
  (typeof value === 'string' && /^\d+$/.test(value));

/**
 * Generates CSS custom properties (CSS variables) from component props
 *
 * @param props - Component props that should be converted to CSS variables
 * @returns Object containing CSS custom properties
 *
 * @example
 * createCSSVariables({
 *   color: "red",
 *   fontSize: 16,
 *   marginTop: "2rem"
 * })
 * → {
 *   "--hscl-color": "red",
 *   "--hscl-font-size": "16px",
 *   "--hscl-margin-top": "2rem"
 * }
 */
/**
 * Interface for CSS variable map to improve type safety
 */
interface CSSVariableMap {
  [variableName: string]: string | number;
}

export const createCSSVariables = (
  props: Partial<BaseComponentProps>,
  componentName: string
): CSSVariableMap => {
  // Input validation with specific error messages
  if (!componentName) {
    throw new Error('Component name is required for CSS variable generation');
  }

  if (componentName.includes(' ')) {
    throw new Error(
      'Component name cannot contain spaces (use camelCase or kebab-case)'
    );
  }

  const cssVariables: CSSVariableMap = {};
  const kebabComponentName = convertToKebabCase(componentName);

  // Process only style-related props using for...of for better readability
  for (const propName of Object.keys(STYLE_COMPONENT_PROPS)) {
    const propValue = props[propName as keyof BaseComponentProps];

    // Skip undefined values
    if (propValue === undefined) continue;

    // Skip non-primitive values (like CSSProperties objects)
    if (typeof propValue !== 'string' && typeof propValue !== 'number')
      continue;

    // Generate CSS variable name with consistent naming pattern
    const variableName = `--hscl-${kebabComponentName}-${convertToKebabCase(
      propName
    )}`;

    // Convert value to appropriate format
    const finalValue = shouldConvertToString(propValue)
      ? convertValueToString(propValue)
      : propValue;

    cssVariables[variableName] = finalValue;
  }

  return cssVariables;
};

// =============================================================================
// PROPS MANAGEMENT UTILITIES
// =============================================================================

/**
 * Separates known BaseComponentProps from unknown/extra props for type-safe handling
 *
 * @param allProps - All props passed to a component
 * @returns Object containing separated baseProps and unknownProps
 *
 * @example
 * separateKnownFromUnknownProps({
 *   color: "red",           // ← Known BaseComponentProps
 *   fontSize: 16,           // ← Known BaseComponentProps
 *   customProp: "value",    // ← Unknown prop
 *   "data-test": "btn"      // ← Unknown prop
 * })
 * → {
 *   baseProps: { color: "red", fontSize: 16 },
 *   unknownProps: { customProp: "value", "data-test": "btn" }
 * }
 */
/**
 * Interface for separated props result to improve type clarity
 */
interface SeparatedProps<T> {
  baseProps: Partial<BaseComponentProps>;
  unknownProps: Omit<T, keyof BaseComponentProps>;
}

export const separateKnownFromUnknownProps = <
  T extends Record<string, unknown>
>(
  allProps: T
): SeparatedProps<T> => {
  const baseProps: Partial<BaseComponentProps> = {};
  const unknownProps: Record<string, unknown> = {};

  // Use for...of for cleaner iteration and better readability
  for (const [propKey, propValue] of Object.entries(allProps)) {
    if (BASE_COMPONENT_PROP_KEYS.has(propKey as keyof BaseComponentProps)) {
      // Type assertion is necessary here due to the dynamic nature of the operation
      (baseProps as Record<string, unknown>)[propKey] = propValue;
    } else {
      unknownProps[propKey] = propValue;
    }
  }

  return {
    baseProps,
    unknownProps: unknownProps as Omit<T, keyof BaseComponentProps>,
  };
};

/**
 * Merges component props with default values, with explicit props taking precedence
 *
 * @param props - The component props (may be partial)
 * @param defaults - Default values to use for undefined props
 * @returns Complete props object with defaults applied
 *
 * @example
 * resolveDefaultAndExplicitProps(
 *   { color: "blue", fontSize: undefined }, // explicit props
 *   { color: "red", fontSize: 16, fontWeight: "bold" } // defaults
 * )
 * → {
 *   color: "blue",        // ← Explicit prop wins
 *   fontSize: 16,         // ← Default used (was undefined)
 *   fontWeight: "bold"    // ← Default used (not provided)
 * }
 */
export const resolveDefaultAndExplicitProps = <T extends BaseComponentProps>(
  props: Partial<T>,
  defaults: Partial<T>
): T => {
  const resolved = { ...props };

  // Apply defaults for any undefined values
  Object.keys(defaults).forEach(key => {
    const typedKey = key as keyof T;
    if (resolved[typedKey] === undefined && defaults[typedKey] !== undefined) {
      (resolved as Record<keyof T, T[keyof T]>)[typedKey] = defaults[typedKey];
    }
  });

  return resolved as T;
};

// =============================================================================
// CONFIGURATION UTILITIES
// =============================================================================

/**
 * Creates a helper function to extract choice options from preset configuration objects
 * Used to generate choice arrays for CMS field components from variant/preset configurations
 *
 * @param configObject - Configuration object with preset definitions
 * @returns Array of [key, label] tuples for use in ChoiceField components
 *
 * @example
 * // Given a configuration object like BUTTON_VARIANTS:
 * const BUTTON_VARIANTS = {
 *   primary: { label: 'Primary', defaultProps: {...} },
 *   secondary: { label: 'Secondary', defaultProps: {...} }
 * }
 *
 * // Usage:
 * const getVariantChoices = choiceFieldOptionsGetter(BUTTON_VARIANTS);
 * getVariantChoices() → [['primary', 'Primary'], ['secondary', 'Secondary']]
 *
 * // This result can be directly used in CMS ChoiceField:
 * <ChoiceField choices={getVariantChoices()} ... />
 */
export const choiceFieldOptionsGetter = (
  configObject: Record<
    string,
    { label: string; defaultProps: BaseComponentProps }
  >
): (() => [string, string][]) => {
  return () =>
    Object.entries(configObject).map(([key, config]) => [key, config.label]);
};

// =============================================================================
// VARIANT SYSTEM UTILITIES
// =============================================================================

/**
 * Merges className strings with space separation
 * @param existingClassName - The current className string (may be undefined)
 * @param additionalClassName - The className to add
 * @returns Combined className string
 */
export const mergeClassNames = (
  existingClassName: string | undefined,
  additionalClassName: string
): string => {
  return existingClassName
    ? `${existingClassName} ${additionalClassName}`.trim()
    : additionalClassName;
};

/**
 * Merges CSS style objects (shallow merge)
 * @param existingStyle - The current style object (may be undefined)
 * @param additionalStyle - The style object to merge in
 * @returns Combined style object
 */
export const mergeStyleObjects = (
  existingStyle: React.CSSProperties | undefined,
  additionalStyle: React.CSSProperties
): React.CSSProperties => {
  return { ...existingStyle, ...additionalStyle };
};

/**
 * Extracts variant props from dimensions based on configuration and selected values
 * @param config - The variant configuration object
 * @param allProps - All component props including variant selectors
 * @returns Object containing merged variant props
 */
const extractVariantPropsFromDimensions = <T extends VariantConfig>(
  config: T,
  allProps: Record<string, unknown>
): Record<string, unknown> => {
  const variantProps: Record<string, unknown> = {};

  // Process each dimension in the variant configuration
  for (const [dimensionKey, dimension] of Object.entries(config.dimensions)) {
    // Get the selected value for this dimension (prop value or default)
    const selectedValue =
      (allProps[dimensionKey] as string) ?? config.defaults?.[dimensionKey];

    // Skip if no value selected or dimension option doesn't exist
    if (!selectedValue || !dimension[selectedValue]) continue;

    const dimensionProps = dimension[selectedValue].props;

    // Merge dimension props with special handling for className and style
    for (const [propKey, propValue] of Object.entries(dimensionProps)) {
      if (propKey === 'className' && typeof propValue === 'string') {
        variantProps.className = mergeClassNames(
          variantProps.className as string | undefined,
          propValue
        );
      } else if (
        propKey === 'style' &&
        propValue &&
        typeof propValue === 'object'
      ) {
        variantProps.style = mergeStyleObjects(
          variantProps.style as React.CSSProperties | undefined,
          propValue as React.CSSProperties
        );
      } else {
        // For all other props, use standard assignment (last one wins)
        variantProps[propKey] = propValue;
      }
    }
  }

  return variantProps;
};

/**
 * Creates a complete variant system from configuration
 */
export function createVariantSystem<T extends VariantConfig>(config: T) {
  /**
   * Resolves variant props by merging dimension values with defaults
   */
  const resolveVariantProps = (
    allProps: Record<string, unknown>,
    explicitBaseProps: Partial<BaseComponentProps>
  ): BaseComponentProps => {
    // Extract variant props using our dedicated helper function
    const variantProps = extractVariantPropsFromDimensions(config, allProps);

    // Explicit base props override variant props
    return resolveDefaultAndExplicitProps(explicitBaseProps, variantProps);
  };

  /**
   * Combines separateKnownFromUnknownProps and resolveDefaultAndExplicitProps functionality in a single method.
   * Separates base props from unknown props, resolves variant styling, and merges everything.
   *
   * @param allProps - All component props
   * @returns Object with resolvedProps (merged base + variant props) and unknownProps (for DOM passthrough)
   *
   * @example
   * const { resolvedProps, unknownProps } = variantSystem.resolveAllProps({
   *   variant: 'primary',
   *   size: 'large',
   *   color: 'blue',        // explicit base prop
   *   'data-test': 'btn',   // unknown prop
   *   onClick: handleClick  // unknown prop
   * });
   */
  const resolveAllPropsWithConfig = <TProps extends Record<string, unknown>>(
    allProps: TProps
  ): {
    resolvedProps: BaseComponentProps;
    unknownProps: Omit<TProps, keyof BaseComponentProps>;
  } => {
    // First, separate base props from unknown props
    const { baseProps, unknownProps } = separateKnownFromUnknownProps(allProps);

    // Then resolve variant props and merge with base props
    const resolvedProps = resolveVariantProps(allProps, baseProps);

    return {
      resolvedProps,
      unknownProps,
    };
  };

  /**
   * Gets choice options for a specific dimension
   * @param dimensionKey - The dimension to get choices for
   * @returns Array of [value, label] tuples for CMS ChoiceField
   */
  const getChoicesForDimension = (dimensionKey: string): [string, string][] =>
    Object.entries(config.dimensions[dimensionKey] || {}).map(
      ([key, option]) => [key, option.choiceFieldOptionLabel]
    );

  /**
   * Gets all dimension keys from variant configuration
   * @returns Array of dimension keys
   */
  const getDimensionKeysFromConfig = (): string[] =>
    Object.keys(config.dimensions);

  /**
   * Gets the full variant configuration (useful for debugging)
   * @returns The complete configuration object
   */
  const getVariantConfig = (): T => config;

  return {
    resolveAllProps: resolveAllPropsWithConfig,
    getChoicesFor: getChoicesForDimension,
    getDimensionKeys: getDimensionKeysFromConfig,
    getConfig: getVariantConfig,
  };
}

/**
 * Type-safe helper to create variant configs with full type inference
 */
export function defineVariantConfig<T extends VariantConfig>(config: T): T {
  return config;
}

/**
 * Extracts variant prop types directly from a variant system instance
 * Usage: type MyVariantProps = ExtractVariantTypes<typeof myVariantSystem>
 */
export type ExtractVariantTypes<T> = T extends ReturnType<
  typeof createVariantSystem<infer Config extends VariantConfig>
>
  ? ExtractVariantProps<Config>
  : never;

/**
 * Extracts a specific dimension type from a variant system instance
 * Usage: type MyVariant = ExtractDimensionType<typeof myVariantSystem, 'variant'>
 */
export type ExtractDimensionType<
  T,
  DimensionKey extends string
> = T extends ReturnType<
  typeof createVariantSystem<infer Config extends VariantConfig>
>
  ? DimensionKey extends keyof Config['dimensions']
    ? keyof Config['dimensions'][DimensionKey]
    : never
  : never;
