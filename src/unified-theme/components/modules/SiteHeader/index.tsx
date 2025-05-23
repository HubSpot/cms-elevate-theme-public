// import { dummyTranslations } from '../../LanguageSwitcherComponent/dummyData.js';
import { ModuleMeta } from '../../types/modules.js';
// @ts-expect-error -- ?island not typed
import MenuComponent from '../../MenuComponent/index.js?island';
import SiteHeaderSVG from './assets/Header.svg';
import { Button } from '../../ButtonComponent/index.js';
import StyledComponentsRegistry from '../../StyledComponentsRegistry/StyledComponentsRegistry.jsx';
import { styled } from 'styled-components';
// @ts-expect-error -- ?island not typed
import MobileMenuIsland from './islands/MobileMenuIsland.js?island';
// @ts-expect-error -- ?island not typed
import MobileLogoBackButton from './islands/MobileLogoBackButton.js?island';
import StyledIsland from '../../StyledComponentsRegistry/StyledIsland.js';
import { SharedIslandState, useLanguageVariants } from '@hubspot/cms-components';
import { getLinkFieldHref, getLinkFieldRel, getLinkFieldTarget } from '../../utils/content-fields.js';
import { MenuModulePropTypes, MainNavProps } from './types.js';
import { PlaceholderEmptyContent } from '../../PlaceholderComponent/PlaceholderEmptyContent.js';
// @ts-expect-error -- ?island not typed
import LanguageSwitcherIsland from '../../LanguageSwitcherComponent/index.js?island';

const MOBILE_BREAKPOINT_NO_LANG_SWITCHER: string = '1100px';
const MOBILE_BREAKPOINT_WITH_LANG_SWITCHER: string = '1215px';

const SiteHeader = styled.div<{ $navBarBackgroundColor: string; $mobileBreakpoint: string }>`
  width: 100%;
  height: auto;
  background-color: ${({ $navBarBackgroundColor }) => $navBarBackgroundColor};
  position: relative;
  z-index: 10;
  padding-inline: var(--hsElevate--spacing--48, 48px);
  padding-block: var(--hsElevate--spacing--24, 24px);

  @media (max-width: ${props => props.$mobileBreakpoint}) {
    padding-inline: var(--hsElevate--spacing--32, 32px);
  }
`;

const SiteHeaderContainer = styled.div`
  max-width: var(--hsElevate--contentWrapper--wide__maxWidth);
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: var(--hsElevate--spacing--24, 24px);
  width: 100%;
`;

const MainNav = styled.div<MainNavProps & { $mobileBreakpoint: string }>`
  flex: 1 1 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .hs-elevate-menu {
    gap: var(--hsElevate--spacing--12, 12px);

    @media (min-width: 800px) {
      gap: var(--hsElevate--spacing--16, 16px);
    }

    @media (min-width: 900px) {
      gap: var(--hsElevate--spacing--32, 32px);
    }
  }

  li {
    border-color: ${({ $navBarBackgroundColor }) => $navBarBackgroundColor};
    color: ${({ $menuTextColor }) => $menuTextColor};

    a,
    .hs-elevate-menu__menu-item-span {
      color: ${({ $menuTextColor }) => $menuTextColor};
      padding: var(--hsElevate--spacing--8, 8px) var(--hsElevate--spacing--24, 24px) var(--hsElevate--spacing--8, 8px) var(--hsElevate--spacing--12, 12px);
      text-decoration: none;
    }

    a:hover {
      color: ${({ $menuTextHoverColor }) => $menuTextHoverColor};
      text-decoration: none;
    }

    &[data-hs-elevate-menuitem-depth='2'] {
      .hs-elevate-menu__arrow {
        right: var(--hsElevate--spacing--8, 8px);
        display: inline-flex;
        align-items: center;
      }
    }

    .hs-elevate-menu__arrow {
      pointer-events: none;
      position: absolute;
      right: var(--hsElevate--spacing--12, 12px);
      top: 50%;
      transform: translateY(-50%);
      display: inline;

      .hs-elevate-menu__arrow-path {
        fill: ${({ $menuTextColor }) => $menuTextColor};
      }
    }
  }

  ul {
    background-color: ${({ $navBarBackgroundColor }) => $navBarBackgroundColor};
    border-color: ${({ $menuAccentColor }) => $menuAccentColor};
  }

  // All submenus and hover element
  .hs-elevate-menu__menu-item-link-container {
    background-color: ${({ $navBarBackgroundColor }) => $navBarBackgroundColor};
  }

  [data-hs-elevate-menuitem-depth='1'] {
    > .hs-elevate-menu__menu-item-link-container:hover {
      background-color: ${({ $navBarBackgroundColor }) => $navBarBackgroundColor};
    }

    li .hs-elevate-menu__menu-item-link-container:hover {
      background-color: ${({ $menuAccentColor }) => $menuAccentColor};
    }

    > ul {
      filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.05));
    }

    > .hs-elevate-menu__menu-item-link-container {
      > .hs-elevate-menu__arrow {
        transform: translateY(-50%) rotate(90deg);
      }
    }

    // Adjust the behavior of the right most flyouts
    @media (max-width: 1100px) {
      &:last-of-type {
        > ul {
          right: 0;
          left: initial;

          ul {
            left: initial;
            right: calc(100% + var(--hsElevate--spacing--12, 12px));
          }
        }
      }
    }
  }

  @media (max-width: ${props => props.$mobileBreakpoint}) {
    display: none;
  }
`;
const LanguageSwitcherContainer = styled.div<{ $mobileBreakpoint: string }>`
  @media (max-width: ${props => props.$mobileBreakpoint}) {
    display: none;
  }
`;

const ButtonContainer = styled.div`
  display: none;
  flex: 0 1 auto;

  @media (min-width: 460px) {
    margin-left: auto;
    display: block;
  }

  @media (min-width: 769px) {
    flex: 0 0 auto;
  }
`;

const MobileMenuContainer = styled.div<{ $mobileBreakpoint: string }>`
  display: none;
  @media (max-width: ${props => props.$mobileBreakpoint}) {
    display: block;
  }
`;

const LogoButtonContainer = styled.div`
  flex: 0 1 auto;
  margin-right: auto;

  @media (min-width: 769px) {
    flex: 0 0 auto;
  }
`;

export const Component = (props: MenuModulePropTypes) => {
  const {
    hublData: {
      navigation: { children: navDataArray = [] },
      companyName,
      defaultLogo,
      logoLink,
      isInEditor,
    },
    groupLogo: { logo: logoField },
    defaultContent: { logoLinkAriaText, languageSwitcherSelectText, placeholderTitle, placeholderDescription },
    groupButton,
    styles,
  } = props;

  const isEditorMode = isInEditor ?? false;

  const {
    showButton,
    buttonContentText: buttonText,
    buttonContentLink: buttonLink,
    buttonContentShowIcon: showIcon,
    buttonContentIconPosition: iconPosition,
  } = groupButton;

  // Temporary until logoField is fixed
  defaultLogo.suppress_company_name = logoField.suppress_company_name;
  const logoToUse = logoField.override_inherited_src ? logoField : defaultLogo;

  const {
    groupMenu: {
      menuAlignment,
      menuBackgroundColor: { color: menuBackgroundColor } = {
        color: '#ffffff',
      },
      menuAccentColor: { color: menuAccentColor } = { color: '#D3DAE4' },
      menuTextColor: { color: menuTextColor } = { color: '#09152B' },
      menuTextHoverColor: { color: menuTextHoverColor } = { color: '#F7F9FC' },
    },
    groupButton: { buttonStyleVariant, buttonStyleSize },
  } = styles;

  const translations = useLanguageVariants();
  const showLanguageSwitcher = translations?.length > 1;
  const langSwitcherIconFieldPath = 'globe_icon';

  const mobileBreakpoint = showLanguageSwitcher ? MOBILE_BREAKPOINT_WITH_LANG_SWITCHER : MOBILE_BREAKPOINT_NO_LANG_SWITCHER;

  return (
    <StyledComponentsRegistry>
      <SiteHeader className="hs-elevate-site-header" $navBarBackgroundColor={menuBackgroundColor} $mobileBreakpoint={mobileBreakpoint}>
        <SharedIslandState value={[]}>
          {/* Controls back button when mobile nav is open */}
          <SiteHeaderContainer className="hs-elevate-site-header__header-container">
            <LogoButtonContainer className="hs-elevate-site-header__logo-container">
              <StyledIsland
                module={MobileLogoBackButton}
                logoField={logoToUse}
                companyName={companyName}
                logoLinkAriaText={logoLinkAriaText}
                logoLink={logoLink}
              />
            </LogoButtonContainer>
            {navDataArray.length === 0 && isEditorMode ? (
              <PlaceholderEmptyContent title={placeholderTitle} description={placeholderDescription} />
            ) : (
              <MainNav
                $navBarBackgroundColor={menuBackgroundColor}
                $menuAccentColor={menuAccentColor}
                $menuTextColor={menuTextColor}
                $menuTextHoverColor={menuTextHoverColor}
                $mobileBreakpoint={mobileBreakpoint}
                className="hs-elevate-site-header__main-nav"
              >
                <StyledIsland
                  module={MenuComponent}
                  menuDataArray={navDataArray}
                  flow="horizontal"
                  menuAlignment={menuAlignment}
                  maxDepth={3}
                  navigationAriaLabel="Main navigation"
                  flyouts={true}
                  wrapperStyle={{ flex: '1 0 100%' }}
                  additionalClassArray={['hs-elevate-site-header__main-nav-menu']}
                />
              </MainNav>
            )}
            {showLanguageSwitcher && (
              <LanguageSwitcherContainer $mobileBreakpoint={mobileBreakpoint}>
                <StyledIsland
                  module={LanguageSwitcherIsland}
                  menuBackgroundColor={menuBackgroundColor}
                  menuBackgroundColorHover={menuAccentColor}
                  textColor={menuTextColor}
                  textColorHover={menuTextHoverColor}
                  languageSwitcherSelectText={languageSwitcherSelectText}
                  langSwitcherIconFieldPath={langSwitcherIconFieldPath}
                />
              </LanguageSwitcherContainer>
            )}

            {showButton && (
              <ButtonContainer className="hs-elevate-site-header__button-container">
                <Button
                  href={getLinkFieldHref(buttonLink)}
                  buttonStyle={buttonStyleVariant}
                  buttonSize={buttonStyleSize}
                  target={getLinkFieldTarget(buttonLink)}
                  rel={getLinkFieldRel(buttonLink)}
                  showIcon={showIcon}
                  iconFieldPath="groupButton.buttonContentIcon"
                  iconPosition={iconPosition}
                  additionalClassArray={['hs-elevate-site-header__button']}
                >
                  {buttonText}
                </Button>
              </ButtonContainer>
            )}

            <MobileMenuContainer className="hs-elevate-site-header__mobile-menu-container" $mobileBreakpoint={mobileBreakpoint}>
              <StyledIsland
                module={MobileMenuIsland}
                menuDataArray={navDataArray}
                flow="horizontal"
                maxDepth={3}
                menuAlignment={menuAlignment}
                navigationAriaLabel="Main mobile navigation"
                flyouts={true}
                menuBackgroundColor={menuBackgroundColor}
                menuAccentColor={menuAccentColor}
                menuTextColor={menuTextColor}
                menuTextHoverColor={menuTextHoverColor}
                buttonStyleVariant={buttonStyleVariant}
                buttonStyleSize={buttonStyleSize}
                groupButton={groupButton}
                hublData={props.hublData}
                myAvailableTranslations={translations}
                languageSwitcherSelectText={languageSwitcherSelectText}
                langSwitcherIconFieldPath={langSwitcherIconFieldPath}
              />
            </MobileMenuContainer>
          </SiteHeaderContainer>
        </SharedIslandState>
      </SiteHeader>
    </StyledComponentsRegistry>
  );
};

export { fields } from './fields.js';

export const hublDataTemplate = `
  {% set hublData = {
      "navigation": menu(module.groupNavigation.menu, "site_root"),
      "companyName": branding_company_name,
      "logoLink": brand_settings.logo.link,
      "defaultLogo": {
        "src": brand_settings.logo.src,
        "alt": brand_settings.logo.alt,
        "width": brand_settings.logo.width,
        "height": brand_settings.logo.height
      },
      "isInEditor": is_in_editor
    }
  %}
`;

// NOTE: Source an Icon for this module
export const meta: ModuleMeta = {
  label: 'Site header',
  content_types: ['BLOG_LISTING', 'BLOG_POST', 'SITE_PAGE', 'LANDING_PAGE'],
  icon: SiteHeaderSVG,
  categories: ['design'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/site_header',
  version: 0,
  themeModule: true,
};
