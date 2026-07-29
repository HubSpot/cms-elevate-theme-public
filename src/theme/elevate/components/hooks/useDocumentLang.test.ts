/**
 * @vitest-environment jsdom
 */

import { describe, test, expect, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDocumentLang } from './useDocumentLang.js';

describe('useDocumentLang', () => {
  afterEach(() => {
    // Reset document language to empty state for next test
    document.documentElement.removeAttribute('lang');
  });

  describe('when document.documentElement.lang has a value', () => {
    test('should return the document language', () => {
      document.documentElement.lang = 'en-US';

      const { result } = renderHook(() => useDocumentLang());

      expect(result.current).toBe('en-US');
    });
  });

  describe('when document.documentElement.lang is empty string', () => {
    test('should return undefined', () => {
      document.documentElement.lang = '';

      const { result } = renderHook(() => useDocumentLang());

      expect(result.current).toBeUndefined();
    });
  });

  describe('when document.documentElement.lang is not set', () => {
    test('should return undefined when lang attribute is missing', () => {
      // Ensure no lang attribute is set (this is the default state)
      document.documentElement.removeAttribute('lang');

      const { result } = renderHook(() => useDocumentLang());

      expect(result.current).toBeUndefined();
    });
  });

  describe('when document.documentElement.lang is set to null or undefined', () => {
    test('should return undefined when lang is set to null (DOM converts to "null" string)', () => {
      // Test the DOM quirk: assigning null to lang property results in "null" string
      document.documentElement.lang = null;

      const { result } = renderHook(() => useDocumentLang());

      expect(result.current).toBeUndefined();
    });

    test('should return undefined when lang is set to undefined (DOM converts to "undefined" string)', () => {
      document.documentElement.lang = undefined;

      const { result } = renderHook(() => useDocumentLang());

      expect(result.current).toBeUndefined();
    });
  });

  describe('when document language changes after mount', () => {
    test('should NOT update when document.lang changes after hook is mounted', () => {
      document.documentElement.lang = 'en-US';

      const { result, rerender } = renderHook(() => useDocumentLang());

      expect(result.current).toBe('en-US');

      document.documentElement.lang = 'es-ES';

      rerender();

      // Hook should still return the original language from mount time
      expect(result.current).toBe('en-US');
    });
  });

  describe('with different language code formats', () => {
    test('should handle various valid language code formats', () => {
      const languageCodes = ['en', 'fr-FR', 'zh-CN', 'es-419', 'pt-BR'];

      languageCodes.forEach(langCode => {
        document.documentElement.lang = langCode;

        const { result, unmount } = renderHook(() => useDocumentLang());

        expect(result.current).toBe(langCode);

        // Clean up this hook instance
        unmount();
      });
    });
  });

  describe('multiple hook instances', () => {
    test('should work independently when multiple instances are used', () => {
      document.documentElement.lang = 'de-DE';

      const { result: result1 } = renderHook(() => useDocumentLang());
      const { result: result2 } = renderHook(() => useDocumentLang());

      // Both instances should return the same value
      expect(result1.current).toBe('de-DE');
      expect(result2.current).toBe('de-DE');
      expect(result1.current).toBe(result2.current);
    });
  });
});
