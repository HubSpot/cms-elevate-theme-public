import { createElement, forwardRef } from 'react';

/**
 * Creates a named React component for any HTML element.
 * Useful for creating semantic components without styled-components overhead.
 *
 * @param tag - The HTML element tag name (e.g., 'div', 'img', 'h2')
 * @returns A React component that renders the specified HTML element
 *
 * @example
 * ```tsx
 * const CardWrapper = createComponent('div');
 * const CardTitle = createComponent('h2');
 * const CardImage = createComponent('img');
 *
 * // Usage:
 * <CardWrapper className="card">
 *   <CardTitle>My Title</CardTitle>
 *   <CardImage src="image.jpg" alt="Description" />
 * </CardWrapper>
 * ```
 */

// Type representing any valid HTML element tag name
export type HTMLElementTag = keyof JSX.IntrinsicElements;

// Type representing the props for a specific HTML element
export type HTMLElementProps<Tag extends HTMLElementTag> = JSX.IntrinsicElements[Tag];

export const createComponent = <Tag extends HTMLElementTag>(tag: Tag) => {
  const NamedComponent = forwardRef<HTMLElement, HTMLElementProps<Tag>>((props, ref) => {
    return createElement(tag, { ...props, ref });
  });

  NamedComponent.displayName = `Component(${tag})`;

  return NamedComponent;
};
