/**
 * @vitest-environment jsdom
 */

import { describe, test, expect, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useIsInEditor } from './useIsInEditor.js';

describe('useIsInEditor', () => {
  afterEach(() => {
    // Reset document element classes to clean state for next test
    document.documentElement.className = '';
  });

  describe('when hs-inline-edit class is present', () => {
    test('should return true when document.documentElement has hs-inline-edit class', () => {
      document.documentElement.classList.add('hs-inline-edit');

      const { result } = renderHook(() => useIsInEditor());

      expect(result.current).toBe(true);
    });

    test('should return true when hs-inline-edit class is present with other classes', () => {
      document.documentElement.classList.add('some-other-class', 'hs-inline-edit', 'another-class');

      const { result } = renderHook(() => useIsInEditor());

      expect(result.current).toBe(true);
    });
  });

  describe('when hs-inline-edit class is not present', () => {
    test('should return false when document.documentElement has no classes', () => {
      // documentElement should have no classes by default after cleanup
      const { result } = renderHook(() => useIsInEditor());

      expect(result.current).toBe(false);
    });

    test('should return false when document.documentElement has other classes but not hs-inline-edit', () => {
      document.documentElement.classList.add('some-class', 'another-class', 'third-class');

      const { result } = renderHook(() => useIsInEditor());

      expect(result.current).toBe(false);
    });

    test('should return false when document.documentElement has similar but not exact class name', () => {
      document.documentElement.classList.add('hs-inline-editor', 'hs-inline', 'inline-edit');

      const { result } = renderHook(() => useIsInEditor());

      expect(result.current).toBe(false);
    });
  });

  describe('when document element class changes after mount', () => {
    test('should NOT update when hs-inline-edit class is added after hook is mounted', () => {
      // Start without the class
      document.documentElement.className = '';

      const { result, rerender } = renderHook(() => useIsInEditor());

      expect(result.current).toBe(false);

      document.documentElement.classList.add('hs-inline-edit');

      rerender();

      // Hook should still return the original value from mount time
      expect(result.current).toBe(false);
    });

    test('should NOT update when hs-inline-edit class is removed after hook is mounted', () => {
      // Start with the class
      document.documentElement.classList.add('hs-inline-edit');

      const { result, rerender } = renderHook(() => useIsInEditor());

      expect(result.current).toBe(true);

      document.documentElement.classList.remove('hs-inline-edit');

      rerender();

      // Hook should still return the original value from mount time
      expect(result.current).toBe(true);
    });
  });

  describe('multiple hook instances', () => {
    test('should work independently when multiple instances are used', () => {
      document.documentElement.classList.add('hs-inline-edit');

      const { result: result1 } = renderHook(() => useIsInEditor());
      const { result: result2 } = renderHook(() => useIsInEditor());

      // Both instances should return the same value
      expect(result1.current).toBe(true);
      expect(result2.current).toBe(true);
      expect(result1.current).toBe(result2.current);
    });

    test('should work independently when mounted at different times with different states', () => {
      // Mount first instance without the class
      document.documentElement.className = '';
      const { result: result1 } = renderHook(() => useIsInEditor());

      // Add the class and mount second instance
      document.documentElement.classList.add('hs-inline-edit');
      const { result: result2 } = renderHook(() => useIsInEditor());

      expect(result1.current).toBe(false);

      expect(result2.current).toBe(true);
    });
  });

  describe('edge cases', () => {
    test('should handle className with only whitespace', () => {
      document.documentElement.className = '   ';

      const { result } = renderHook(() => useIsInEditor());

      expect(result.current).toBe(false);
    });

    test('should be case sensitive for class name matching', () => {
      document.documentElement.classList.add('HS-INLINE-EDIT', 'Hs-Inline-Edit');

      const { result } = renderHook(() => useIsInEditor());

      expect(result.current).toBe(false);
    });
  });
});
