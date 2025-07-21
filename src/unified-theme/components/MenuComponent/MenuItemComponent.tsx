import { CSSProperties } from 'react';
import { styled } from 'styled-components';
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

// Base z-index for the menu component hierarchy. Using a base value with offsets ensures related elements maintain their stacking order when the base needs to be adjusted to account for new components that might conflict with z-index layering.
const baseZindex = 100;

const StyledMenuItem = styled.li<{ $flyouts?: boolean; $menuDepth: number }>`
  ${props =>
    props?.$flyouts &&
    props?.$menuDepth > 1 &&
    `
      border-style: solid;
      border-color: white; /* hook up to module settings */
      border-left-width: 10px;
      border-right-width: 10px;
      border-bottom-width: 10px;
      padding: 0;

      &:first-child {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        border-top-width: 10px;
      }
      &:last-child {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
      }
  `}
`;

const StyledMenuItemLinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledMenuItemLink = styled.a`
  flex-grow: 1;
  padding: var(--hsElevate--spacing--8, 8px);
  display: block;
`;

const StyledMenuArrow = styled.span`
  cursor: pointer;
  font-size: var(--hsElevate--body--large__fontSize);
  display: block;
  margin-inline-start: var(--hsElevate--spacing--8, 8px);
  line-height: 1;
  height: 100%;

  @media (max-width: 768px) {
    padding-inline-end: var(--hsElevate--spacing--16, 16px);
  }
`;

const StyledSubmenu = styled.ul<{ $flyouts?: boolean; $menuDepth: number }>`
  ${props =>
    props?.$flyouts &&
    `
      position: absolute;
      right: var(--hsElevate--flyoutSubMenu__right, 'auto');
      bottom: var(--hsElevate--flyoutSubMenu__bottom, 'auto');
  `}

  ${props =>
    props?.$flyouts &&
    props?.$menuDepth === 1 &&
    `
      top: var(--hsElevate--firstFlyoutMenu__top, 100%);
      left: var(--hsElevate--firstFlyoutMenu__left, 0);
  `}
  ${props =>
    props?.$flyouts &&
    props?.$menuDepth > 1 &&
    `
      top: var(--hsElevate--flyoutSubMenu__top, calc(-1 * var(--hsElevate--spacing--12, 12px)));
      left: var(--hsElevate--flyoutSubMenu__left, calc(100% + var(--hsElevate--spacing--12, 12px)));
  `}

  z-index: ${baseZindex + 10};
  padding: 0px;
`;

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

    // Pure anchor links like '#anchor' are same-page
    return false;
  }
};

export default function MenuItemComponent(props: MenuItemComponentProps) {
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

  function getSubmenuClasses(): string {
    const baseClass = 'hs-elevate-menu__submenu';
    const flyoutClass = flyouts ? 'hs-elevate-menu__flyout-submenu' : '';
    const mobileClass = isMobileMenu ? 'hs-elevate-menu__flyout-submenu--mobile' : '';

    return `${baseClass} ${flyoutClass} ${mobileClass}`;
  }

  function addFlyoutVisiblity(visibleMenuItems): CSSProperties {
    const displayValue = visibleMenuItems.includes(idString) ? 'block' : 'none';

    return { display: displayValue };
  }

  function addMenuItemClasses(linkStyleVariant: LinkStyleType) {
    const linkClassName = linkStyleVariant === 'secondary_links' ? 'hs-elevate-link--secondary' : 'hs-elevate-link--primary';

    return currentLevel === 1 ? `${linkClassName} ${topLevelMenuItemClasses}` : `${linkClassName} ${subMenuItemClasses}`;
  }
  function addSubMenuItemStyles() {
    return currentLevel === 1 ? topLevelMenuItemStyles : subMenuItemStyles;
  }

  function handleTriggeredMenuItem(idString) {
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
    <StyledMenuItem
      $menuDepth={currentLevel}
      $flyouts={flyouts}
      className={getMenuItemClass()}
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
      <StyledMenuItemLinkContainer className="hs-elevate-menu__menu-item-link-container">
        {/* If the menu item has a URL, render a link. Otherwise, render a span. */}
        <StyledMenuItemLink
          {...sharedMenuItemLinkProps}
          {...(hasUrl
            ? { onClick: e => handleAnchorClick(e), href: menuData.url, ...linkAttributes }
            : { as: 'span', onClick: () => isMobileMenu && menuData.children.length > 0 && handleTriggeredMenuItem(idString) })}
        >
          {menuData.label}
        </StyledMenuItemLink>
        {showNestedMenuIcon && (
          <StyledMenuArrow className="hs-elevate-menu__arrow" onClick={() => handleTriggeredMenuItem(idString)}>
            <ArrowComponent />
          </StyledMenuArrow>
        )}
      </StyledMenuItemLinkContainer>
      {showChildrenUnorderList(menuData.children) && (
        <StyledSubmenu
          $menuDepth={currentLevel}
          $flyouts={flyouts}
          className={getSubmenuClasses()}
          style={flyouts ? addFlyoutVisiblity(visibleMenuItems) : undefined}
        >
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
        </StyledSubmenu>
      )}
    </StyledMenuItem>
  );
}
