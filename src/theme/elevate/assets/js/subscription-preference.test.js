/**
 * @vitest-environment jsdom
 */
import { describe, test, expect, beforeEach, vi } from 'vitest';
import {
  domReady,
  uncheckUnsubIndividualCheckboxes,
  uncheckUnsubAllCheckbox,
  handleCheckboxChange,
  initializeSubscriptionPreferences,
} from './subscription-preferences.js';

// Mock DOM elements
const mockEmailSubCheckboxes = [{ checked: false }, { checked: false }, { checked: false }];

const mockEmailGlobalUnsub = { checked: false };

describe('Subscription Preferences', () => {
  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks();

    // Reset checkbox states
    mockEmailSubCheckboxes.forEach(checkbox => {
      checkbox.checked = false;
    });

    mockEmailGlobalUnsub.checked = false;
  });

  describe('domReady', () => {
    test('should call callback immediately when document is ready', () => {
      const callback = vi.fn();

      vi.spyOn(document, 'readyState', 'get').mockReturnValue('complete');

      domReady(callback);

      expect(callback).toHaveBeenCalled();

      vi.restoreAllMocks();
    });

    test('should add event listener when document is not ready', () => {
      const callback = vi.fn();
      const addEventListenerSpy = vi.spyOn(document, 'addEventListener');

      vi.spyOn(document, 'readyState', 'get').mockReturnValue('loading');

      domReady(callback);

      expect(addEventListenerSpy).toHaveBeenCalledWith('DOMContentLoaded', callback);

      vi.restoreAllMocks();
    });
  });

  describe('uncheckUnsubIndividualCheckboxes', () => {
    test('should uncheck all individual subscription checkboxes', () => {
      // Mock the DOM query
      const querySelectorAllSpy = vi.spyOn(document, 'querySelectorAll');
      querySelectorAllSpy.mockReturnValue(mockEmailSubCheckboxes);

      // Set some checkboxes to checked
      mockEmailSubCheckboxes[0].checked = true;
      mockEmailSubCheckboxes[1].checked = true;

      // Verify they are actually set to true before calling the function
      expect(mockEmailSubCheckboxes[0].checked).toBe(true);
      expect(mockEmailSubCheckboxes[1].checked).toBe(true);

      uncheckUnsubIndividualCheckboxes();

      expect(mockEmailSubCheckboxes[0].checked).toBe(false);
      expect(mockEmailSubCheckboxes[1].checked).toBe(false);
      expect(mockEmailSubCheckboxes[2].checked).toBe(false);

      querySelectorAllSpy.mockRestore();
    });
  });

  describe('uncheckUnsubAllCheckbox', () => {
    test('should uncheck global unsubscribe checkbox when it exists', () => {
      const querySelectorSpy = vi.spyOn(document, 'querySelector');
      querySelectorSpy.mockReturnValue(mockEmailGlobalUnsub);

      mockEmailGlobalUnsub.checked = true;

      // Verify it is actually set to true before calling the function
      expect(mockEmailGlobalUnsub.checked).toBe(true);

      uncheckUnsubAllCheckbox();

      expect(mockEmailGlobalUnsub.checked).toBe(false);

      querySelectorSpy.mockRestore();
    });

    test('should handle case when global unsubscribe checkbox does not exist', () => {
      const querySelectorSpy = vi.spyOn(document, 'querySelector');
      querySelectorSpy.mockReturnValue(null);

      // Should not throw an error
      expect(() => uncheckUnsubAllCheckbox()).not.toThrow();

      querySelectorSpy.mockRestore();
    });
  });

  describe('handleCheckboxChange', () => {
    test('should call uncheckUnsubIndividualCheckboxes when globalunsub checkbox is checked', () => {
      const querySelectorAllSpy = vi.spyOn(document, 'querySelectorAll');
      querySelectorAllSpy.mockReturnValue(mockEmailSubCheckboxes);

      const mockEvent = {
        target: {
          type: 'checkbox',
          checked: true,
          name: 'globalunsub',
        },
      };

      mockEmailSubCheckboxes[0].checked = true;
      mockEmailSubCheckboxes[1].checked = true;

      // Verify they are actually set to true before calling the function
      expect(mockEmailSubCheckboxes[0].checked).toBe(true);
      expect(mockEmailSubCheckboxes[1].checked).toBe(true);

      handleCheckboxChange(mockEvent);

      expect(mockEmailSubCheckboxes[0].checked).toBe(false);
      expect(mockEmailSubCheckboxes[1].checked).toBe(false);
      expect(mockEmailSubCheckboxes[2].checked).toBe(false);

      querySelectorAllSpy.mockRestore();
    });

    test('should call uncheckUnsubAllCheckbox when individual checkbox is checked', () => {
      const querySelectorSpy = vi.spyOn(document, 'querySelector');
      querySelectorSpy.mockReturnValue(mockEmailGlobalUnsub);

      const mockEvent = {
        target: {
          type: 'checkbox',
          checked: true,
          name: 'individual-checkbox',
        },
      };

      mockEmailGlobalUnsub.checked = true;

      // Verify it is actually set to true before calling the function
      expect(mockEmailGlobalUnsub.checked).toBe(true);

      handleCheckboxChange(mockEvent);

      expect(mockEmailGlobalUnsub.checked).toBe(false);

      querySelectorSpy.mockRestore();
    });

    test('should not do anything when checkbox is unchecked', () => {
      const querySelectorSpy = vi.spyOn(document, 'querySelector');
      const querySelectorAllSpy = vi.spyOn(document, 'querySelectorAll');

      const mockEvent = {
        target: {
          type: 'checkbox',
          checked: false,
          name: 'globalunsub',
        },
      };

      handleCheckboxChange(mockEvent);

      expect(querySelectorSpy).not.toHaveBeenCalled();
      expect(querySelectorAllSpy).not.toHaveBeenCalled();

      querySelectorSpy.mockRestore();
      querySelectorAllSpy.mockRestore();
    });

    test('should not do anything when event target is not a checkbox', () => {
      const querySelectorSpy = vi.spyOn(document, 'querySelector');
      const querySelectorAllSpy = vi.spyOn(document, 'querySelectorAll');

      const mockEvent = {
        target: {
          type: 'button',
          checked: true,
          name: 'globalunsub',
        },
      };

      handleCheckboxChange(mockEvent);

      expect(querySelectorSpy).not.toHaveBeenCalled();
      expect(querySelectorAllSpy).not.toHaveBeenCalled();

      querySelectorSpy.mockRestore();
      querySelectorAllSpy.mockRestore();
    });

    test('should handle null/undefined event target', () => {
      const mockEvent = {
        target: null,
      };

      expect(() => handleCheckboxChange(mockEvent)).not.toThrow();

      const mockEventUndefined = {
        target: undefined,
      };

      expect(() => handleCheckboxChange(mockEventUndefined)).not.toThrow();
    });
  });

  describe('initializeSubscriptionPreferences', () => {
    test('should return false when document.body does not exist', () => {
      vi.spyOn(document, 'body', 'get').mockReturnValue(null);

      const result = initializeSubscriptionPreferences();

      expect(result).toBe(false);

      vi.restoreAllMocks();
    });

    test('should return false when parent container does not exist', () => {
      const querySelectorSpy = vi.spyOn(document, 'querySelector');
      querySelectorSpy.mockReturnValue(null);

      const result = initializeSubscriptionPreferences();

      expect(result).toBe(false);
      expect(querySelectorSpy).toHaveBeenCalledWith('.email-prefs');

      querySelectorSpy.mockRestore();
    });

    test('should return true and add event listener when parent container exists', () => {
      const mockParentContainer = {
        addEventListener: vi.fn(),
      };

      const querySelectorSpy = vi.spyOn(document, 'querySelector');
      querySelectorSpy.mockReturnValue(mockParentContainer);

      const result = initializeSubscriptionPreferences();

      expect(result).toBe(true);
      expect(mockParentContainer.addEventListener).toHaveBeenCalledWith('change', handleCheckboxChange);

      querySelectorSpy.mockRestore();
    });
  });
});
