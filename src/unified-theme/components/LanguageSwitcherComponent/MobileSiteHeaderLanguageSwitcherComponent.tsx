// For testing purposes / local developement swap out translations with dummyTranslations
import styles from './mobile-site-header-language-switcher.module.css';
import cx, { staticWithModule } from '../utils/classnames.js';
import { createComponent } from '../utils/create-component.js';
import { useState, useRef, useMemo } from 'react';
import { getLanguageDisplayName, shouldDisplayLanguageSwitcher, createTranslationsArrayAsObject } from './utils.js';
import LanguageOptions from './LanguageOptions.jsx';
import { LanguageSwitcherProps } from '../types/language.js';
import { useLanguageVariants, Icon } from '@hubspot/cms-components';
import GlobeIcon from './assets/Globe.js';
import { useDocumentLang } from '../hooks/useDocumentLang.js';
import { CSSPropertiesMap } from '../types/components.js';

const swm = staticWithModule(styles);

// Functions to generate CSS variables

type ColorProps = {
  menuBackgroundColor: string;
  textColor: string;
  menuBackgroundColorHover: string;
  textColorHover: string;
};

function generateColorCssVars(props: ColorProps): CSSPropertiesMap {
  const { menuBackgroundColor, menuBackgroundColorHover, textColor, textColorHover } = props;

  return {
    '--hsElevate--languageSwitcher__backgroundColor': menuBackgroundColor,
    '--hsElevate--languageSwitcher__textColor': textColor,
    '--hsElevate--languageSwitcher__hover--backgroundColor': menuBackgroundColorHover,
    '--hsElevate--languageSwitcher__hover--textColor': textColorHover,
  };
}

// Components

const MobileLanguageSwitcherContainer = createComponent('div');
const LanguageSwitcherButton = createComponent('button');
const LanguageButtonContent = createComponent('div');
const LanguageOptionsContainer = createComponent('div');
const LanguageLabel = createComponent('div');
const OptionsScrollWrapper = createComponent('div');
const Overlay = createComponent('div');

const MobileSiteHeaderLanguageSwitcher = (props: LanguageSwitcherProps) => {
  const translations = props.translations ? props.translations : useLanguageVariants();
  const activeTranslation = translations.find(item => item.isActive);
  const documentLang = useDocumentLang();
  const currentPageLanguage = useMemo(() => activeTranslation?.languageCode || documentLang, [activeTranslation, documentLang]);

  // Early return if no translations or no current page language
  if (!shouldDisplayLanguageSwitcher(translations, currentPageLanguage)) {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const {
    menuBackgroundColor = 'var(--hsElevate--section--lightSection--1__backgroundColor)',
    menuBackgroundColorHover = 'var(--hsElevate--section--lightSection--1__backgroundColor)',
    textColor = 'var(--hsElevate--section--lightSection--1__textColor)',
    textColorHover = 'var(--hsElevate--section--lightSection--1__textColor)',
    languageSwitcherSelectText = 'Select a language',
    langSwitcherIconFieldPath,
  } = props;

  const translationsArrayAsObject = createTranslationsArrayAsObject(translations);
  const currentPageLanguageDisplayName = getLanguageDisplayName({ currentPageLanguage, translationsArrayAsObject });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const langSwitcherIcon = langSwitcherIconFieldPath ? <Icon fieldPath={langSwitcherIconFieldPath} /> : <GlobeIcon />;
  const toggleLanguageOptions = () => {
    setIsOpen(!isOpen);
  };

  const overlayClassNames = cx(swm('hs-elevate-site-header__language-switcher-overlay'), {
    [styles['hs-elevate-site-header__language-switcher-overlay--open']]: isOpen,
  });

  const languageSwitcherContainerClassNames = cx(swm('hs-elevate-site-header__language-switcher-container'), {
    [styles['hs-elevate-site-header__language-switcher-container--open']]: isOpen,
  });

  const cssVarsMap = { ...generateColorCssVars({ menuBackgroundColor, menuBackgroundColorHover, textColor, textColorHover }) };

  return (
    <>
      {isOpen && <Overlay onClick={() => setIsOpen(false)} className={overlayClassNames} />}
      <MobileLanguageSwitcherContainer className={languageSwitcherContainerClassNames} style={cssVarsMap}>
        <LanguageSwitcherButton
          ref={buttonRef}
          onClick={toggleLanguageOptions}
          aria-expanded={isOpen}
          aria-controls="language-options"
          className={swm('hs-elevate-site-header__language-switcher-button')}
        >
          <LanguageButtonContent className={swm('hs-elevate-site-header__language-switcher-button-content')}>
            {langSwitcherIcon}
            <span className="hs-elevate-site-header__language-switcher-current-language">{currentPageLanguageDisplayName}</span>
          </LanguageButtonContent>
        </LanguageSwitcherButton>
        <LanguageOptionsContainer className={swm('hs-elevate-site-header__language-switcher-options-container')}>
          <LanguageLabel className={swm('hs-elevate-site-header__language-switcher-select-language-label')}>{languageSwitcherSelectText}</LanguageLabel>
          <OptionsScrollWrapper className={swm('hs-elevate-site-header__language-switcher-options-scroll-wrapper')}>
            <LanguageOptions
              translations={translations}
              menuBackgroundColorHover={menuBackgroundColorHover}
              textColor={textColor}
              textColorHover={textColorHover}
              fontSize="var(--hsElevate--heading--h6__fontSize, 14px)"
            />
          </OptionsScrollWrapper>
        </LanguageOptionsContainer>
      </MobileLanguageSwitcherContainer>
    </>
  );
};

export default MobileSiteHeaderLanguageSwitcher;
