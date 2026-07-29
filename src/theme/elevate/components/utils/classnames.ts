/**
 * Combines multiple class name inputs into a single space-separated string.
 * Supports strings, arrays, and objects where keys with truthy values are included.
 * All whitespace is properly trimmed and empty values are excluded.
 * Basically this is a replacement for the classnames library.
 */
export default function cx(...args: unknown[]): string {
  const classes: string[] = [];

  // Process all arguments
  args.flat(Infinity).forEach(arg => {
    // Skip falsy values early
    if (!arg) return;

    // Handle string arguments
    if (typeof arg === 'string') {
      const trimmed = arg.trim();
      if (trimmed) {
        classes.push(trimmed);
      }
      return;
    }

    // Handle object arguments (className: condition pairs)
    if (typeof arg === 'object' && arg !== null && !Array.isArray(arg)) {
      Object.entries(arg as Record<string, unknown>).forEach(([key, value]) => {
        // Only include keys with truthy values
        if (value) {
          const trimmed = key.trim();
          if (trimmed) {
            classes.push(trimmed);
          }
        }
      });
    }
  });

  // Join all classes with a single space
  return classes.join(' ');
}

/**
 * scopedClass — maps global class names to their CSS Modules equivalents
 * and combines them into a single className string.
 *
 * Usage:
 *   const swm = scopedClass(styles);
 *
 *   // Single class (string)
 *   className={swm('hs-button')}
 *
 *   // Multiple classes (string, space-separated)
 *   className={swm('hs-button hs-button--primary')}
 *
 * Example output:
 *   "hs-button hs-button_xyz123 hs-button--primary hs-button--primary_abc456"
 *
 * @param styles - The CSS Modules object (e.g., import styles from './Component.module.css')
 * @returns A function that takes one or more base class names and returns the combined className string
 */
export const staticWithModule = (styles: Record<string, string>) => {
  return (classNames: string): string => {
    // Normalize to an array of class names
    if (!classNames || typeof classNames !== 'string') {
      return '';
    }
    const classList = classNames.trim().split(/\s+/);

    // For each class name, include both the global and CSS module version (if present)
    const mapped = classList.flatMap(cls => [cls, styles[cls]].filter(Boolean));

    // Combine into a clean, space-separated string
    return cx(mapped);
  };
};
