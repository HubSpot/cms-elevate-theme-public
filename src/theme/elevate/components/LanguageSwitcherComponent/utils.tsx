import { LanguageVariant } from '@hubspot/cms-components';

// Define interfaces for styled components props

type TranslationsArrayAsObject = Record<string, LanguageVariant>;

type GetLanguageDisplayNameArgs = {
  currentPageLanguage: string;
  translationsArrayAsObject: TranslationsArrayAsObject;
};

// Shared utility functions
export const getLanguageDisplayName = (args: GetLanguageDisplayNameArgs) => {
  const { currentPageLanguage, translationsArrayAsObject } = args;

  return translationsArrayAsObject[currentPageLanguage].languageDisplayName.LOCALIZED;
};

export const createTranslationsArrayAsObject = (translations: LanguageVariant[]): TranslationsArrayAsObject | null => {
  // Early return if no translations
  if (!translations || Object.keys(translations).length <= 1) {
    return null;
  }

  return translations.reduce((acc, translation) => {
    acc[translation.languageCode] = translation;
    return acc;
  }, {});
};

// Utility function to check if language switcher should be displayed
export const shouldDisplayLanguageSwitcher = (translations: LanguageVariant[] | undefined | [] | null, currentPageLanguage: string | null | undefined) => {
  return !!translations && Array.isArray(translations) && translations.length > 1 && !!currentPageLanguage;
};
