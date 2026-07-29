import { LanguageVariant } from '@hubspot/cms-components';
import styles from './language-options.module.css';
import cx, { staticWithModule } from '../utils/classnames.js';
import { createComponent } from '../utils/create-component.js';
import { CSSPropertiesMap } from '../types/components.js';

const swm = staticWithModule(styles);

// Types

export interface LanguageOptionsProps {
  translations: LanguageVariant[];
  menuBackgroundColorHover?: string;
  textColor?: string;
  textColorHover?: string;
  fontSize?: string;
}

// Functions to generate CSS variables

type ColorProps = {
  textColor: string;
  menuBackgroundColorHover: string;
  textColorHover: string;
};

function generateColorCssVars(props: ColorProps): CSSPropertiesMap {
  const { textColor, menuBackgroundColorHover, textColorHover } = props;

  return {
    '--hsElevate--languageSwitcher__textColor': textColor,
    '--hsElevate--languageSwitcher__hover--backgroundColor': menuBackgroundColorHover,
    '--hsElevate--languageSwitcher__hover--textColor': textColorHover,
  };
}

type TypographyProps = {
  fontSize: string;
};

function generateTypographyCssVars(props: TypographyProps): CSSPropertiesMap {
  const { fontSize } = props;

  return { '--hsElevate--languageSwitcher__fontSize': fontSize };
}

// Components

const LanguageList = createComponent('ul');
const LanguageItem = createComponent('li');
const LanguageLink = createComponent('a');

export const LanguageOptions = ({
  translations,
  menuBackgroundColorHover = 'var(--hsElevate--section--lightSection--1__backgroundColor)',
  textColor = 'var(--hsElevate--section--lightSection--1__textColor)',
  textColorHover = 'var(--hsElevate--section--lightSection--1__textColor)',
  fontSize = 'var(--hsElevate--heading--h5__fontSize, 18px)',
}: LanguageOptionsProps) => {
  if (!translations || Object.keys(translations).length <= 1) {
    return null;
  }

  const cssVarsMap = {
    ...generateColorCssVars({ textColor, menuBackgroundColorHover, textColorHover }),
    ...generateTypographyCssVars({ fontSize }),
  };

  return (
    <LanguageList style={cssVarsMap} role="menu" className={swm('hs-elevate-language-switcher__language-list')}>
      {translations.map(translation => (
        <LanguageItem
          key={translation.languageCode}
          role="menuitem"
          className={cx(swm('hs-elevate-language-switcher__language-item'), {
            [styles['hs-elevate-language-switcher__language-item--active']]: translation.isActive,
          })}
        >
          <LanguageLink
            href={translation.localizedUrl}
            lang={translation.languageCode}
            hrefLang={translation.languageCode}
            className={swm('hs-elevate-language-switcher__language-link')}
          >
            {translation.languageDisplayName.LOCALIZED}
          </LanguageLink>
        </LanguageItem>
      ))}
    </LanguageList>
  );
};

export default LanguageOptions;
