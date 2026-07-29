/**
 * Shared types for language switcher components
 */

import { LanguageVariant } from '@hubspot/cms-components';

export interface LanguageSwitcherProps {
  translations?: LanguageVariant[];
  textColor?: string;
  textColorHover?: string;
  menuBackgroundColorHover?: string;
  menuBackgroundColor?: string;
  languageSwitcherSelectText?: string;
  langSwitcherIconFieldPath?: string;
}
