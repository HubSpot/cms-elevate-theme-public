import { useState, useRef, KeyboardEvent, FocusEvent, useEffect, useCallback, useMemo } from 'react';
import { MenuComponentProps, MenuItemRefsType, LinkRefsType, A11yControllerType, visibleMenuItemsControllerType } from './types.js';
import { MenuItemComponent } from './MenuItemComponent.js';
import { getAlignmentFieldCss } from '../utils/style-fields.js';

function MenuComponent(props: MenuComponentProps) {
  const {
    menuDataArray,
    flow = 'vertical',
    menuAlignment,
    navigationAriaLabel = '',
    flyouts,
    isMobileMenu,
    triggeredMenuItems,
    setTriggeredMenuItems,
    linkStyleVariant,
    additionalClassArray,
    mobileAnchorClickCallback,
    ...rest
  } = props;

  // Used for keyboard navigation
  const isFirstRender = useRef<boolean>(true); // Don't useEffect on first render
  const [triggerHandleKeydown, setTriggerHandleKeydown] = useState<boolean>(false);
  const [currentKeyboardEvent, setCurrentKeyboardEvent] = useState<KeyboardEvent | null>(null);
  const [currentKeyboardElementId, setCurrentKeyboardElementId] = useState<string>('');
  // used for component state
  const [focusedItem, setFocusedItem] = useState(null);
  const [visibleMenuItems, setVisibleMenuItems] = useState<string[]>([]);
  const menuItemRefs: MenuItemRefsType = useRef([]);
  const linkRefs: LinkRefsType = useRef([]);
  const navRef = useRef<HTMLElement>(null);

  const visibleMenuItemsController: visibleMenuItemsControllerType = {
    visibleMenuItems,
    setVisibleMenuItems,
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const arrowKeyMap = {
      ArrowDown: () => setVisibleMenuItems((currentArray: string[]) => [...currentArray, currentKeyboardElementId]),
      ArrowUp: () =>
        setVisibleMenuItems(currentArray =>
          // Remove last number from the id string to find the parent
          currentArray.filter(item => {
            const idAsArray = currentKeyboardElementId.split('-');
            idAsArray.pop();
            const idStringToRemove = idAsArray.join('-');
            return item !== idStringToRemove;
          })
        ),
    };

    // call keybaordEvent with the correct ID parsed from above.
    if (currentKeyboardEvent.key in arrowKeyMap) {
      arrowKeyMap[currentKeyboardEvent.key]();
    }

    setTriggerHandleKeydown(prevState => !prevState);
  }, [currentKeyboardEvent, currentKeyboardElementId]);

  useEffect(() => {
    handleKeydown(currentKeyboardEvent, currentKeyboardElementId);
  }, [triggerHandleKeydown]);

  function resetVisibleMenuItems() {
    setVisibleMenuItems([]);
  }

  const keyboardEventCallback = useCallback((event: KeyboardEvent, elementId: string) => {
    if (event.key === 'Tab') {
      resetVisibleMenuItems();
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    setCurrentKeyboardEvent(event);
    setCurrentKeyboardElementId(elementId);
  }, []);

  const handleKeydown = (e: KeyboardEvent, currentElementId: string) => {
    if (!e?.key) {
      return;
    }
    const targetKeys = new Set(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'Escape']);
    // rename space key from ' ' to 'Space' to make more readable
    const key = e.key === ' ' ? 'Space' : e.key;
    if (!targetKeys.has(key)) {
      return true;
    }

    /*
     * Id of the nav items looks like "x" "x-x" "x-x-x" etc depending on the depth of the item
     * Example might be "0-1-2" which means it's the 3rd child of the 2nd child of the 1st child of the 0th item.
     * This allows us to take a nested array and flatten it into a single array of items.
     * while providing a way to still navigate the nested structure.
     */

    // Id broken into an array of strings ["0", "0", "0] = first item > first child > first child
    const idArray = currentElementId.split('-');
    // Parent level of the current item ["0", "0"] = first item > first child
    const idArrayParentLevel = idArray.slice(0, idArray.length - 1);
    // Last number is needed for calculations later on 0
    const idArrayLastNumber = parseInt(idArray[idArray.length - 1]);
    const isNavElementFocused = idArray[0] === '';
    const isNavElementFocusedAndArrowDown = isNavElementFocused && key === 'ArrowDown';

    function findNextSibling() {
      // Increment last number to find next sibling 0 -> 1
      const nextSiblingNumber = idArrayLastNumber + 1;

      /*
       * Create a clone of the OG array. We don't want to mutate the original
       * Add the new number to the end of the array as a string ["0", "0", "1"]
       */

      const idArrayParentLevelCopy = [...idArrayParentLevel, nextSiblingNumber.toString()];
      // Join the array to create the new id "0-0-1"
      const nextSiblingId = idArrayParentLevelCopy.join('-');
      // Find the element in the refs object based off of the new id string
      const nextSiblingElement = linkRefs.current[nextSiblingId];

      if (!nextSiblingElement) {
        // If no sibling exists, go back to the first sibling of the parent
        const tempArray = [...idArrayParentLevel, 0];
        return linkRefs.current[tempArray.join('-')];
      }

      return nextSiblingElement;
    }

    function findPreviousSibling() {
      const previousSiblingNumber = idArrayLastNumber - 1;
      const idArrayParentLevelCopy = [...idArrayParentLevel, previousSiblingNumber.toString()];
      const previousSiblingId = idArrayParentLevelCopy.join('-');
      const previousSiblingElement = linkRefs.current[previousSiblingId];

      if (!previousSiblingElement) {
        /*
         * If no previous sibling is found go back to the last sibling of the parent
         * The idea here is that we are going to try to match parent ID strings in the refs object
         */

        // If the parent level is empty, we are at the top level.
        const parentIdToMatch = idArrayParentLevel.length > 0 ? `${idArrayParentLevel.join('-')}-` : null;
        const filteredSiblingsArray = Object.keys(linkRefs.current).filter(item => {
          if (parentIdToMatch === null) {
            // if we are at the top level, we want to return all items that don't have a hyphen in them
            return !item.includes('-') ? item : null;
          }

          /*
           * if we are not at the top level, we want to return all items that start with the parent ID.
           * we also want to make sure that the item's length is the same length as the parent ID
           */

          return item.startsWith(parentIdToMatch) && item.split('-').length === parentIdToMatch.split('-').length ? item : null;
        });

        // return the last item if the filteredSiblingsArray
        const lastSibling = filteredSiblingsArray[filteredSiblingsArray.length - 1];
        return linkRefs.current[lastSibling];
      }

      return previousSiblingElement;
    }

    function findChild() {
      /*
       * Add a 0 to the end of the array to find the first child
       * ["0", "0"] -> ["0", "0", "0"]
       */

      idArray.push('0');
      const potentialChildId = idArray.join('-');

      if (linkRefs.current[potentialChildId]) {
        return linkRefs.current[potentialChildId];
      }
      return linkRefs.current[currentElementId];
    }

    function findParent() {
      /*
       * Remove the last number from the array to find the parent
       * ["0", "0", "0"] -> ["0", "0"]
       */

      idArray.pop();
      if (idArray.length === 0) {
        return linkRefs.current[currentElementId];
      }
      return linkRefs.current[idArray.join('-')];
    }

    const keyActions = {
      Escape: () => {
        resetVisibleMenuItems();
        navRef.current!.tabIndex = 0;
        navRef.current!.focus();
      },
      Space: () => {
        const currentElement = linkRefs.current[currentElementId];
        currentElement.click();
      },
      ArrowUp: () => {
        findParent().focus();
      },
      ArrowDown: () => {
        findChild().focus();
      },
      ArrowLeft: () => {
        findPreviousSibling().focus();
      },
      ArrowRight: () => {
        findNextSibling().focus();
      },
    };

    // drill down into top level nav item if nav focused and arrow down pressed
    if (isNavElementFocusedAndArrowDown) {
      const firstElement = linkRefs.current['0'];
      if (firstElement) {
        firstElement.focus();
      }
    }
    // do nothing if nav element is focused and any other key is pressed
    if (isNavElementFocused) {
      return;
    }
    // do appropriate action if nav item is focused and key is pressed
    keyActions[key]();
  };

  const handleFocus = useCallback((e: FocusEvent, key: string) => {
    e.stopPropagation();
    setFocusedItem(key);
  }, []);

  const handleBlur = useCallback(() => {
    setFocusedItem(null);
  }, []);

  const a11yController: A11yControllerType = useMemo(
    () => ({
      handleFocus,
      handleBlur,
      focusedItem,
      keyboardEventCallback,
      menuItemRefs,
      linkRefs,
    }),
    [handleFocus, handleBlur, focusedItem, keyboardEventCallback, menuItemRefs, linkRefs]
  );

  const flowClasses = {
    horizontal: 'hs-elevate-menu--horizontal',
    vertical: 'hs-elevate-menu--vertical',
  };

  const additionalClasses = additionalClassArray ? additionalClassArray?.join(' ') : '';

  const hsElevateMenuClasses = `hs-elevate-menu ${flowClasses[flow]} ${
    isMobileMenu ? 'hs-elevate-menu--mobile' : 'hs-elevate-menu--desktop'
  } ${additionalClasses}`;

  const listStyles = { padding: 0 };

  return (
    <nav tabIndex={0} ref={navRef} onKeyDown={e => handleKeydown(e, '')} {...(navigationAriaLabel && { 'aria-label': navigationAriaLabel })}>
      <ul role="menu" className={hsElevateMenuClasses} style={isMobileMenu ? {} : { ...getAlignmentFieldCss(menuAlignment), ...listStyles }}>
        {menuDataArray.map((item, index: number) => {
          return (
            <MenuItemComponent
              key={index.toString()}
              menuData={item}
              idString={index.toString()}
              a11yController={a11yController}
              flyouts={flyouts}
              keyboardEventCallback={keyboardEventCallback}
              visibleMenuItemsController={visibleMenuItemsController}
              isMobileMenu={isMobileMenu}
              triggeredMenuItems={triggeredMenuItems}
              setTriggeredMenuItems={setTriggeredMenuItems}
              linkStyleVariant={linkStyleVariant}
              mobileAnchorClickCallback={mobileAnchorClickCallback}
              {...rest}
            />
          );
        })}
      </ul>
    </nav>
  );
}

export default MenuComponent;
