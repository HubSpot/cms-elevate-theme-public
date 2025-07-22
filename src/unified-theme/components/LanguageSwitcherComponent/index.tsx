// For testing purposes / local developement swap out translations with dummyTranslations
// import { dummyTranslations, dummyTranslationsAsObject } from './dummyData.js';

import styles from './language-switcher.module.css';
import cx from '../utils/classnames.js';
import { createComponent } from '../utils/create-component.js';
import { shouldDisplayLanguageSwitcher, getLanguageDisplayName, createTranslationsArrayAsObject } from './utils.jsx';
import LanguageOptions from './LanguageOptions.jsx';
import { LanguageSwitcherProps } from '../types/language.js';
import { useState, MouseEvent as ReactMouseEvent, useMemo } from 'react';
import { useLanguageVariants, Icon } from '@hubspot/cms-components';
import { useIsInEditor } from '../hooks/useIsInEditor.js';
import GlobeIcon from './assets/Globe.js';
import useDocumentLang from '../hooks/useDocumentLang.js';
import { CSSPropertiesMap } from '../types/components.js';

// Functions to generate CSS variables

type ColorProps = {
  textColor: string;
  menuBackgroundColor: string;
};

function generateColorCssVars(props: ColorProps): CSSPropertiesMap {
  const { textColor, menuBackgroundColor } = props;

  return {
    '--hsElevate--languageSwitcher__textColor': textColor,
    '--hsElevate--languageSwitcher__backgroundColor': menuBackgroundColor,
  };
}

// Components

const LanguageSwitcherNav = createComponent('nav');
const LanguageSwitcherButton = createComponent('div');
const SidePanel = createComponent('div');
const PanelHeader = createComponent('div');
const PanelTitle = createComponent('span');
const CloseButton = createComponent('button');
const PanelContent = createComponent('div');
const Overlay = createComponent('div');

const LanguageSwitcherIsland = (props: LanguageSwitcherProps) => {
  const translations = props.translations ? props.translations : useLanguageVariants();
  const activeTranslation = translations.find(item => item.isActive);
  const documentLang = useDocumentLang();
  const currentPageLanguage = useMemo(() => activeTranslation?.languageCode || documentLang, [activeTranslation, documentLang]);

  // Early return if no translations or no current page language
  if (!shouldDisplayLanguageSwitcher(translations, currentPageLanguage)) {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const translationsArrayAsObject = createTranslationsArrayAsObject(translations);
  const currentPageLanguageDisplayName = getLanguageDisplayName({ currentPageLanguage, translationsArrayAsObject });
  const {
    menuBackgroundColor = 'var(--hsElevate--section--lightSection--1__backgroundColor)',
    menuBackgroundColorHover = 'var(--hsElevate--section--lightSection--1__backgroundColor)',
    textColor = 'var(--hsElevate--section--lightSection--1__textColor)',
    textColorHover = 'var(--hsElevate--section--lightSection--1__textColor)',
    languageSwitcherSelectText = 'Select a language',
    langSwitcherIconFieldPath,
  } = props;
  const isInEditor = useIsInEditor();

  const langSwitcherIcon = langSwitcherIconFieldPath ? <Icon fieldPath={langSwitcherIconFieldPath} /> : <GlobeIcon />;

  const handleContainerClick = (e: ReactMouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const closeSidePanel = () => {
    setIsOpen(false);
  };

  function handleLanguageSwitcherClick() {
    setIsOpen(!isOpen);
  }

  const cssVarsMap = {
    ...generateColorCssVars({ textColor, menuBackgroundColor }),
  };

  const overlayClasses = cx('hs-elevate-language-switcher__overlay', styles['hs-elevate-language-switcher__overlay'], {
    [styles['hs-elevate-language-switcher__overlay--open']]: isOpen,
  });

  const sidePanelClasses = cx('hs-elevate-language-switcher__side-panel', styles['hs-elevate-language-switcher__side-panel'], {
    [styles['hs-elevate-language-switcher__side-panel--open']]: isOpen,
  });

  return (
    <LanguageSwitcherNav
      style={cssVarsMap}
      onClick={handleContainerClick}
      className={cx('hs-elevate-language-switcher', styles['hs-elevate-language-switcher'])}
    >
      <LanguageSwitcherButton
        aria-expanded={isOpen}
        aria-label={currentPageLanguageDisplayName}
        onClick={handleLanguageSwitcherClick}
        className={cx('hs-elevate-language-switcher__button', styles['hs-elevate-language-switcher__button'])}
      >
        {langSwitcherIcon}
        <span className="hs-elevate-language-switcher__current-language">{currentPageLanguageDisplayName}</span>
      </LanguageSwitcherButton>
      {isOpen && <Overlay onClick={closeSidePanel} className={overlayClasses} />}
      {!isInEditor && (
        <SidePanel className={sidePanelClasses}>
          <PanelHeader className={cx('hs-elevate-language-switcher__side-panel-header', styles['hs-elevate-language-switcher__side-panel-header'])}>
            <PanelTitle className={cx('hs-elevate-language-switcher__side-panel-title', styles['hs-elevate-language-switcher__side-panel-title'])}>
              {languageSwitcherSelectText}
            </PanelTitle>
            <CloseButton
              onClick={closeSidePanel}
              aria-label="Close language selector"
              className={cx('hs-elevate-language-switcher__side-panel-close-button', styles['hs-elevate-language-switcher__side-panel-close-button'])}
            >
              ✕
            </CloseButton>
          </PanelHeader>

          <PanelContent
            className={cx('hs-elevate-language-switcher__side-panel-options-container', styles['hs-elevate-language-switcher__side-panel-options-container'])}
          >
            <LanguageOptions
              translations={translations}
              menuBackgroundColorHover={menuBackgroundColorHover}
              textColor={textColor}
              textColorHover={textColorHover}
            />
          </PanelContent>
        </SidePanel>
      )}
    </LanguageSwitcherNav>
  );
};

export default LanguageSwitcherIsland;
