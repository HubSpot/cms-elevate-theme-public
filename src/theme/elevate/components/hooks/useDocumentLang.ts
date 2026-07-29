import { useState, useEffect } from 'react';

/**
 * Branded type ensuring only validated language codes are used.
 * Prevents accidental usage of unvalidated strings as language codes.
 */
type ValidLanguageCode = string & { readonly __brand: 'ValidLanguageCode' };

/**
 * Type guard that validates a string is a legitimate language code.
 * Filters out edge cases where DOM might set lang to string values "null" or "undefined".
 * Returns a branded type to prevent accidental use of unvalidated strings.
 */
const isValidLanguageCode = (code: string): code is ValidLanguageCode => {
  return code !== 'null' && code !== 'undefined' && code.length > 0;
};

/**
 * Hook to retrieve the document language attribute from the HTML element
 * Falls back to undefined when no language is set or when running on server
 *
 * Must be used in an island or client component
 */
export const useDocumentLang = (): ValidLanguageCode | undefined => {
  const [documentLang, setDocumentLang] = useState<ValidLanguageCode | undefined>(undefined);

  useEffect(() => {
    // Set document language when component mounts in the browser
    if (typeof document !== 'undefined') {
      const lang = document.documentElement.lang;
      setDocumentLang(lang && isValidLanguageCode(lang) ? lang : undefined);
    }
  }, []);

  return documentLang;
};

export default useDocumentLang;
