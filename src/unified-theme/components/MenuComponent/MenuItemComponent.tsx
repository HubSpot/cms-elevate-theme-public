import { CSSProperties } from 'react';
import styles from './menu-item.module.css';
import cx from '../utils/classnames.js';
import { createComponent } from '../utils/create-component.js';
import ArrowComponent from './ArrowComponent.js';
import { A11yControllerType, MenuDataType, KeyboardEventCallback, visibleMenuItemsControllerType, maxMenuDepth } from './types.js';
import { LinkStyleType } from '../types/fields.js';

interface MenuItemComponentProps {
  menuData: MenuDataType;
  idString: string;
  a11yController: A11yControllerType;
  maxDepth: maxMenuDepth;
  flyouts: boolean;
  topLevelMenuItemStyles?: CSSProperties;
  subMenuItemStyles?: CSSProperties;
  topLevelMenuItemClasses?: string;
  subMenuItemClasses?: string;
  keyboardEventCallback: KeyboardEventCallback;
  visibleMenuItemsController: visibleMenuItemsControllerType;
  triggeredMenuItems: string[];
  setTriggeredMenuItems: (triggeredMenuItems: string[]) => void;
  isMobileMenu: boolean;
  linkStyleVariant: LinkStyleType;
  mobileAnchorClickCallback?: (cb: () => void) => void;
}

export const getAnchorFromUrl = (url: string): string => {
  if (!url) {
    return '';
  }

  try {
    return new URL(url).hash;
  } catch {
    // Handle relative URLs and direct anchor strings
    const hashIndex = url.indexOf('#');
    return hashIndex >= 0 ? url.slice(hashIndex) : '';
  }
};

export const isCrossPageAnchor = (url: string): boolean => {
  if (!url || !url.includes('#')) {
    return false;
  }

  // Pure anchor links like '#anchor' are same-page
  if (url.startsWith('#')) {
    return false;
  }

  try {
    // For full URLs, compare pathnames
    const linkUrl = new URL(url, window.location.origin);
    return linkUrl.pathname !== window.location.pathname;
  } catch {
    // For relative URLs like '/prices#anchor', check if they start with a path
    if (url.startsWith('/') && url.includes('#')) {
      const urlPath = url.split('#')[0];
      return urlPath !== window.location.pathname;
    }

    return false;
  }
};

// Components

const MenuItemContainer = createComponent('li');
const MenuItemLinkContainer = createComponent('div');
const MenuItemLink = createComponent('a');
const MenuItemSpan = createComponent('span');
const MenuArrow = createComponent('span');
const Submenu = createComponent('ul');

export const MenuItemComponent = (props: MenuItemComponentProps) => {
  const {
    menuData,
    a11yController,
    maxDepth,
    idString,
    flyouts,
    topLevelMenuItemClasses,
    topLevelMenuItemStyles,
    subMenuItemClasses,
    subMenuItemStyles,
    visibleMenuItemsController,
    triggeredMenuItems,
    setTriggeredMenuItems,
    isMobileMenu,
    linkStyleVariant,
    mobileAnchorClickCallback,
  } = props;

  const { visibleMenuItems, setVisibleMenuItems } = visibleMenuItemsController;
  const { handleFocus, handleBlur, menuItemRefs, linkRefs, keyboardEventCallback } = a11yController;
  const idStringArray = idString.split('-');
  const currentLevel = idStringArray.length;

  // Check if the menu item has a URL (not null, undefined, or empty)
  const hasUrl = Boolean(menuData.url && menuData.url.trim() !== '');
  const hasChildren = menuData.children.length > 0;

  const handleMouseEnter = () => {
    // Compares all visible menu item id strings to the current id string. All visible menu items should be a part of the current id string. Needed for switching between keyboard and mouse controls. Ex. Current hover = 0-0-1 Show - 0, 0-0, 0-0-1 Don't show - 0-1, etc.
    if (!visibleMenuItems.includes(idString)) {
      setVisibleMenuItems(currentMenuIdArray => [...currentMenuIdArray, idString].filter(item => idString.startsWith(item)));
    }
  };

  const handleMouseLeave = () => {
    setVisibleMenuItems(currentMenuIdArray => currentMenuIdArray.filter(item => item !== idString));
  };

  function isUnderMaxDepth() {
    return currentLevel < maxDepth;
  }

  const showChildrenUnorderList = (children: MenuDataType[]) => {
    return isUnderMaxDepth() && children.length > 0;
  };

  function addFlyoutVisibility(visibleMenuItems: string[]): CSSProperties {
    const displayValue = visibleMenuItems.includes(idString) ? 'block' : 'none';

    return { display: displayValue };
  }

  function addMenuItemClasses(linkStyleVariant: LinkStyleType) {
    const linkClassName = linkStyleVariant === 'secondary_links' ? 'hs-elevate-link--secondary' : 'hs-elevate-link--primary';

    return currentLevel === 1 ? `${linkClassName} ${topLevelMenuItemClasses || ''}` : `${linkClassName} ${subMenuItemClasses || ''}`;
  }
  function addSubMenuItemStyles() {
    return currentLevel === 1 ? topLevelMenuItemStyles : subMenuItemStyles;
  }

  function handleTriggeredMenuItem(idString: string) {
    setTriggeredMenuItems([...triggeredMenuItems, idString]);
  }

  function getMenuItemClass() {
    if (hasChildren) {
      const menuItemClass = 'hs-elevate-menu--has-children';

      if (isMobileMenu && triggeredMenuItems.includes(idString)) {
        return `${menuItemClass} hs-elevate-menu__menu-item--triggered`;
      }

      return menuItemClass;
    }

    return '';
  }

  function getMenuItemClasses() {
    const baseClasses = cx(getMenuItemClass(), styles.menuItem, { [styles['menuItem--flyout']]: flyouts && currentLevel > 1 });

    return baseClasses;
  }

  function getSubmenuClasses() {
    const baseClass = 'hs-elevate-menu__submenu';
    const flyoutClass = flyouts ? 'hs-elevate-menu__flyout-submenu' : '';
    const mobileClass = isMobileMenu ? 'hs-elevate-menu__flyout-submenu--mobile' : '';

    const moduleClasses = cx(styles.submenu, {
      [styles['submenu--flyout']]: flyouts,
      [styles['submenu--flyout-depth-1']]: flyouts && currentLevel === 1,
      [styles['submenu--flyout-depth-gt-1']]: flyouts && currentLevel > 1,
    });

    return `${baseClass} ${flyoutClass} ${mobileClass} ${moduleClasses}`;
  }

  const showNestedMenuIcon = (flyouts || isMobileMenu) && hasChildren && currentLevel != maxDepth;

  const handleSmoothScroll = (anchorLink: string): void => {
    const targetElement = document.querySelector(anchorLink);

    if (!targetElement) {
      console.warn(`Anchor target not found: ${anchorLink}`);
      return;
    }

    targetElement.scrollIntoView({ behavior: 'smooth' });
  };

  const isAnchorLink = (url: string): boolean => {
    return Boolean(url?.includes('#'));
  };

  const handleAnchorClick = (e: React.MouseEvent): void => {
    const url = menuData.url;

    if (!isAnchorLink(url)) {
      return;
    }

    // Don't prevent default for cross-page anchors - let browser handle naturally
    if (isCrossPageAnchor(url)) {
      return;
    }

    // Only prevent default and handle smooth scrolling for same-page anchors
    const anchor = getAnchorFromUrl(url);

    e.preventDefault();

    if (isMobileMenu && mobileAnchorClickCallback) {
      mobileAnchorClickCallback(() => handleSmoothScroll(anchor));
      return;
    }

    handleSmoothScroll(anchor);
  };

  // Define shared props used for the menu item link
  const sharedMenuItemLinkProps = {
    style: addSubMenuItemStyles(),
    className: `${addMenuItemClasses(linkStyleVariant)} ${hasUrl ? 'hs-elevate-menu__menu-item-link' : 'hs-elevate-menu__menu-item-span'}`,
    ref: el => (linkRefs.current[idString] = el),
    tabIndex: -1,
    'aria-expanded': menuData.children.length > 0 ? visibleMenuItems.includes(idString) : undefined,
  };

  // Add target and rel attributes when linkTarget is provided except for anchor links
  const linkAttributes = hasUrl && menuData.linkTarget === '_blank' && !isAnchorLink(menuData.url) ? { target: '_blank', rel: 'noopener' } : {};

  return (
    <MenuItemContainer
      className={getMenuItemClasses()}
      data-hs-elevate-menuitem-depth={currentLevel}
      onFocus={event => handleFocus(event, idString)}
      onBlur={handleBlur}
      onKeyDown={event => keyboardEventCallback(event, idString)}
      tabIndex={-1}
      ref={el => (menuItemRefs.current[idString] = el)}
      role="menuitem"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <MenuItemLinkContainer className={cx('hs-elevate-menu__menu-item-link-container', styles.menuItemLinkContainer)}>
        {/* If the menu item has a URL, render a link. Otherwise, render a span. */}
        {hasUrl ? (
          <MenuItemLink
            {...sharedMenuItemLinkProps}
            className={cx(sharedMenuItemLinkProps.className, styles.menuItemLink)}
            onClick={e => handleAnchorClick(e)}
            href={menuData.url}
            {...linkAttributes}
          >
            {menuData.label}
          </MenuItemLink>
        ) : (
          <MenuItemSpan
            {...sharedMenuItemLinkProps}
            className={cx(sharedMenuItemLinkProps.className, styles.menuItemLink)}
            onClick={() => isMobileMenu && menuData.children.length > 0 && handleTriggeredMenuItem(idString)}
          >
            {menuData.label}
          </MenuItemSpan>
        )}
        {showNestedMenuIcon && (
          <MenuArrow className={cx('hs-elevate-menu__arrow', styles.menuArrow)} onClick={() => handleTriggeredMenuItem(idString)}>
            <ArrowComponent />
          </MenuArrow>
        )}
      </MenuItemLinkContainer>
      {showChildrenUnorderList(menuData.children) && (
        <Submenu className={getSubmenuClasses()} style={flyouts ? addFlyoutVisibility(visibleMenuItems) : undefined}>
          {menuData.children.map((child, childIndex) => {
            const joinedIdString = `${idString}-${childIndex}`;
            return (
              <MenuItemComponent
                key={joinedIdString}
                menuData={child}
                idString={joinedIdString}
                a11yController={a11yController}
                maxDepth={maxDepth}
                flyouts={flyouts}
                subMenuItemClasses={subMenuItemClasses}
                subMenuItemStyles={subMenuItemStyles}
                topLevelMenuItemClasses={topLevelMenuItemClasses}
                topLevelMenuItemStyles={topLevelMenuItemStyles}
                keyboardEventCallback={keyboardEventCallback}
                visibleMenuItemsController={visibleMenuItemsController}
                triggeredMenuItems={triggeredMenuItems}
                setTriggeredMenuItems={setTriggeredMenuItems}
                isMobileMenu={isMobileMenu}
                linkStyleVariant={linkStyleVariant}
                mobileAnchorClickCallback={mobileAnchorClickCallback}
              />
            );
          })}
        </Submenu>
      )}
    </MenuItemContainer>
  );
};
