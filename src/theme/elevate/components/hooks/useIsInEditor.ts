import { useState, useEffect } from 'react';

/**
 * Hook to detect if the current page is being displayed in the HubSpot editor
 * by checking for the 'hs-inline-edit' class on the HTML element
 *
 * Must be used in an island
 */
export const useIsInEditor = (): boolean => {
  const [isInEditor, setIsInEditor] = useState<boolean>(false);

  useEffect(() => {
    const checkIsInEditor = () => {
      const htmlElement = document.documentElement;
      setIsInEditor(htmlElement.classList.contains('hs-inline-edit'));
    };

    // Check immediately
    checkIsInEditor();
  }, []);

  return isInEditor;
};

export default useIsInEditor;
