import { CSSProperties, styled } from 'styled-components';
import MenuComponent from '../../../MenuComponent/index.js';
import { useEffect, useState, useRef } from 'react';
import { useSharedIslandState } from '@hubspot/cms-components';
import { Button } from '../../../ButtonComponent/index.js';
import { getLinkFieldHref } from '../../../utils/content-fields.js';
import { MenuContainerProps, MobileMenuIslandProps } from '../types.js';
import MobileSiteHeaderLanguageSwitcher from '../../../LanguageSwitcherComponent/MobileSiteHeaderLanguageSwitcherComponent.js';

const baseZindex = 1000;

const MenuContainer = styled.div<MenuContainerProps>`
  position: absolute;
  background-color: white; // Change to actual BG color
  top: 100%;
  left: ${({ $isMenuSliding }) => ($isMenuSliding ? '0' : '100%')};
  margin-top: 0;
  width: 100%;
  height: ${({ $headerHeight }) => `calc(100vh - ${$headerHeight}px)`};
  height: ${({ $headerHeight }) => `calc(100dvh - ${$headerHeight}px)`};
  z-index: ${baseZindex};
  transition: all 0.3s ease;
  display: ${({ $showMenu }) => ($showMenu ? 'flex' : 'none')};
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;

  > nav {
    overflow: auto;
    background-color: ${({ $menuBackgroundColor }) => $menuBackgroundColor};
  }

  ul {
    height: ${({ $headerHeight, $mobileButtonContainerHeight, $headerMobileLanguageSwitcherHeight }) =>
      `calc(100vh - ${$headerHeight}px - ${$mobileButtonContainerHeight}px - ${$headerMobileLanguageSwitcherHeight}px)`};
    width: 100%;
    background-color: ${({ $menuBackgroundColor }) => $menuBackgroundColor};
  }

  .hs-elevate-menu--mobile,
  .hs-elevate-menu__flyout-submenu--mobile {
    padding: 10px 32px;
  }

  .hs-elevate-menu {
    gap: 0;
    flex: 0 0 100%;
    margin-bottom: 0;
    align-items: flex-start;
    justify-content: flex-start;

    &:after {
      content: '';
      position: absolute;
      top: -1px;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: ${({ $menuAccentColor }) => $menuAccentColor};
    }

    li {
      position: initial;
      width: 100%;
      color: ${({ $menuTextColor }) => $menuTextColor};

      a,
      .hs-elevate-menu__menu-item-span {
        color: ${({ $menuTextColor }) => $menuTextColor};
        font-weight: 600;
        text-decoration: none;

        &:hover {
          cursor: pointer;
          text-decoration: none;
        }
      }

      .hs-elevate-menu__arrow-path {
        fill: ${({ $menuTextColor }) => $menuTextColor};
      }
    }

    .hs-elevate-menu__menu-item-link-container:hover {
      background-color: ${({ $menuAccentColor }) => $menuAccentColor};
    }

    li[data-hs-elevate-menuitem-depth='1'] ul {
      position: absolute;
      left: 100%;
      top: 0;
      transition: left 0.3s ease;
      width: 100%;
      margin-bottom: 0;
      background-color: ${({ $menuBackgroundColor }) => $menuBackgroundColor};
      z-index: ${baseZindex + 10};
    }

    .hs-elevate-menu--has-children.hs-elevate-menu__menu-item--triggered > ul {
      left: 0;
    }
  }
`;

const MobileSlideoutButtonContainer = styled.div<{
  $menuBackgroundColor: string;
  $headerMobileLanguageSwitcherHeight: number;
}>`
  @media (min-width: 460px) {
    display: none;
  }

  margin-bottom: ${({ $headerMobileLanguageSwitcherHeight }) => $headerMobileLanguageSwitcherHeight}px;
  display: block;
  padding: var(--hsElevate--spacing--24);
  width: 100%;
  margin-top: 0;
  z-index: ${baseZindex + 20};
  background-color: ${({ $menuBackgroundColor }) => $menuBackgroundColor};

  .hs-elevate-site-header__mobile-button {
    width: 100%;
    height: 100%;
    justify-content: center;
  }
`;

const HamburgerMenu = styled.div<{ $menuTextColor: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 25px;
  cursor: pointer;

  div {
    width: 100%;
    height: 4px;
    background-color: ${({ $menuTextColor }) => $menuTextColor};
    transition: all 0.3s ease;
  }

  &.active div:nth-child(1) {
    transform: rotate(45deg) translate(7px, 5px);
  }

  &.active div:nth-child(2) {
    opacity: 0;
  }

  &.active div:nth-child(3) {
    transform: rotate(-45deg) translate(6px, -5px);
  }
`;

export default function MobileMenuIsland(props: MobileMenuIslandProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMenuSliding, setIsMenuSliding] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [triggeredMenuItems, setTriggeredMenuItems] = useSharedIslandState();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [headerMobileLanguageSwitcherHeight, setHeaderMobileLanguageSwitcherHeight] = useState(0);
  const [mobileButtonContainerHeight, setMobileButtonContainerHeight] = useState(0);
  const targetAnchorRef = useRef<string | null>(null);

  const {
    flow,
    flyouts,
    menuBackgroundColor,
    menuAccentColor,
    menuTextColor,
    menuTextHoverColor,
    buttonStyleVariant,
    buttonStyleSize,
    groupButton,
    languageSwitcherSelectText,
    langSwitcherIconFieldPath,
    ...rest
  } = props;

  const {
    showButton,
    buttonContentText: buttonText,
    buttonContentLink: buttonLink,
    buttonContentShowIcon: showIcon,
    buttonContentIconPosition: iconPosition,
  } = groupButton;

  useEffect(() => {
    if (isAnimating) {
      setShowMenu(true);
      // This is to prevent scrolling when the menu is open
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else if (!isAnimating && showMenu) {
      setIsClosing(true);
      setIsMenuSliding(false);
      // Restore scrolling and position
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, [isAnimating]);

  // Handles smooth scrolling to an anchor link when mobile menu is closed
  useEffect(() => {
    if (!isAnimating && targetAnchorRef.current) {
      // Menu is closed, now we can safely scroll
      const element = document.querySelector(targetAnchorRef.current);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      targetAnchorRef.current = null; // Reset the ref after scrolling
    }
  }, [isAnimating]);

  useEffect(() => {
    if (showMenu && !isClosing) {
      setTimeout(() => {
        setIsMenuSliding(true);
      }, 100); // This delay just gives display change time to take effeect so animation works
    } else if (isClosing) {
      setTimeout(() => {
        setShowMenu(false);
        setIsClosing(false);
      }, 300); // Adjust this delay to match the transition duration
    }
  }, [showMenu, isClosing]);

  useEffect(() => {
    const header = document.querySelector('.hs-elevate-site-header') as HTMLElement;

    if (!header) return;

    const updateHeight = () => {
      setHeaderHeight(header.offsetHeight);
    };

    const observer = new MutationObserver(updateHeight);
    observer.observe(header, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    // Initial height set
    updateHeight();

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const headerMobileLanguageSwitcherButton = document.querySelector('.hs-elevate-site-header__language-switcher-button') as HTMLElement;

    if (!headerMobileLanguageSwitcherButton) return;

    const updateHeight = () => {
      const height = headerMobileLanguageSwitcherButton.offsetHeight;
      setHeaderMobileLanguageSwitcherHeight(height);
    };

    const observer = new ResizeObserver(updateHeight);
    observer.observe(headerMobileLanguageSwitcherButton);

    updateHeight();

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const buttonContainer = document.querySelector('.hs-elevate-site-header__mobile-button-container') as HTMLElement;

    // If the button container doesn't exist, set the height to 0
    if (!buttonContainer) {
      setMobileButtonContainerHeight(0);
      return;
    }

    const updateHeight = (height: number) => {
      setMobileButtonContainerHeight(height);
    };

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const targetElement = entry.target as HTMLElement;
        updateHeight(targetElement.offsetHeight);
      }
    });

    resizeObserver.observe(buttonContainer);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const handleOpenCloseMenu = () => {
    setTriggeredMenuItems([]);
    setIsAnimating(!isAnimating);
  };

  const topLevelMenuItemStyles = {
    '--hsElevate--menu--topLevel__gap': '0',
  } as CSSProperties;

  const handleMobileAnchorClick = (clickedMenuItemAnchor: string) => {
    // Store the anchor reference for later use
    targetAnchorRef.current = clickedMenuItemAnchor;
    // Close the menu
    handleOpenCloseMenu();
  };

  return (
    <div className="hs-elevate-site-header__mobile-menu">
      <HamburgerMenu
        className={`hs-elevate-site-header__hamburger-menu ${showMenu ? 'active' : ''}`}
        tab-index="1"
        onClick={handleOpenCloseMenu}
        $menuTextColor={menuTextColor}
      >
        <div></div>
        <div></div>
        <div></div>
      </HamburgerMenu>
      <MenuContainer
        $showMenu={showMenu}
        $isMenuSliding={isMenuSliding}
        $headerHeight={headerHeight}
        $mobileButtonContainerHeight={mobileButtonContainerHeight}
        $headerMobileLanguageSwitcherHeight={headerMobileLanguageSwitcherHeight}
        $menuAccentColor={menuAccentColor}
        $menuBackgroundColor={menuBackgroundColor}
        $menuTextColor={menuTextColor}
        className="hs-elevate-site-header__menu-container"
      >
        <MenuComponent
          {...rest}
          flow="vertical"
          flyouts={false}
          isMobileMenu={true}
          triggeredMenuItems={triggeredMenuItems}
          setTriggeredMenuItems={setTriggeredMenuItems}
          topLevelMenuItemStyles={topLevelMenuItemStyles}
          mobileAnchorClickCallback={handleMobileAnchorClick}
          additionalClassArray={['hs-elevate-site-header__menu']}
        />
        {showButton && (
          <MobileSlideoutButtonContainer
            className="hs-elevate-site-header__mobile-button-container"
            $menuBackgroundColor={menuBackgroundColor}
            $headerMobileLanguageSwitcherHeight={headerMobileLanguageSwitcherHeight}
          >
            <Button
              href={getLinkFieldHref(buttonLink)}
              buttonStyle={buttonStyleVariant}
              buttonSize={buttonStyleSize}
              additionalClassArray={['hs-elevate-site-header__mobile-button']}
              openInNewTab={buttonLink.open_in_new_tab}
              showIcon={showIcon}
              iconFieldPath="groupButton.buttonContentIcon"
              iconPosition={iconPosition}
            >
              {buttonText}
            </Button>
          </MobileSlideoutButtonContainer>
        )}
        {
          <MobileSiteHeaderLanguageSwitcher
            menuBackgroundColor={menuBackgroundColor}
            menuBackgroundColorHover={menuAccentColor}
            textColor={menuTextColor}
            textColorHover={menuTextHoverColor}
            languageSwitcherSelectText={languageSwitcherSelectText}
            langSwitcherIconFieldPath={langSwitcherIconFieldPath}
          />
        }
      </MenuContainer>
    </div>
  );
}
