import { createComponent, HTMLElementTag } from './create-component.js';
import { createElement, isValidElement } from 'react';
import { describe, it, expect } from 'vitest';

describe('createComponent', () => {
  it('should return a React component when called with a valid HTML tag', () => {
    const DivComponent = createComponent('div');
    // forwardRef components are objects with specific React properties
    expect(typeof DivComponent).toBe('object');
    expect(DivComponent).toBeDefined();
    expect(DivComponent.$$typeof).toBeDefined(); // React internal symbol
  });

  it('should create different components for different tags', () => {
    const DivComponent = createComponent('div');
    const SpanComponent = createComponent('span');

    expect(DivComponent).not.toBe(SpanComponent);
  });

  it('should work with various HTML elements', () => {
    const commonTags: HTMLElementTag[] = ['div', 'span', 'img', 'button', 'h1', 'p'];

    commonTags.forEach(tag => {
      const Component = createComponent(tag);
      // Check that it's a valid React component (forwardRef)
      expect(typeof Component).toBe('object');
      expect(Component).toBeDefined();

      // Test that it can be used to create React elements
      const element = createElement(Component, { key: 'test' });
      expect(isValidElement(element)).toBe(true);
    });
  });

  it('should create components that accept props', () => {
    const DivComponent = createComponent('div');
    const props = { className: 'test', id: 'test-id' };

    // Test that the component can be created with React.createElement
    const result = createElement(DivComponent, props);
    expect(result).toBeDefined();
    expect(result.type).toBe(DivComponent);
    expect(result.props).toEqual(props);
  });
});
