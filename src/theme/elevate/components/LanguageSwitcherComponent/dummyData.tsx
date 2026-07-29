import { LanguageVariant } from '@hubspot/cms-components';

// Define a custom type that matches the structure of our dummy data
export type CustomLanguageVariant = {
  isActive: boolean;
  languageCode: string;
  languageDisplayName: {
    PAGELANG: string;
    LOCALIZED: string;
    HYBRID: string;
  };
  localizedUrl: string;
};

export const dummyTranslationsAsObject = {
  fr: {
    isActive: false,
    languageCode: 'fr',
    languageDisplayName: {
      PAGELANG: 'Französisch',
      LOCALIZED: 'Français',
      HYBRID: 'Français (Französisch)',
    },
    localizedUrl: 'https://www.example.com/fr/asdfasd',
  },
  en: {
    isActive: false,
    languageCode: 'en',
    languageDisplayName: {
      PAGELANG: 'Englisch',
      LOCALIZED: 'English',
      HYBRID: 'English (Englisch)',
    },
    localizedUrl: 'https://www.example.com/asdfasd',
  },
  de: {
    isActive: true,
    languageCode: 'de',
    languageDisplayName: {
      PAGELANG: 'Deutsch',
      LOCALIZED: 'Deutsch',
      HYBRID: 'Deutsch',
    },
    localizedUrl: 'https://www.example.com/de/asdfasd',
  },
  es: {
    isActive: false,
    languageCode: 'es',
    languageDisplayName: {
      PAGELANG: 'Spanisch',
      LOCALIZED: 'Español',
      HYBRID: 'Español (Spanisch)',
    },
    localizedUrl: 'https://www.example.com/es/asdfasd',
  },
  it: {
    isActive: false,
    languageCode: 'it',
    languageDisplayName: {
      PAGELANG: 'Italienisch',
      LOCALIZED: 'Italiano',
      HYBRID: 'Italiano (Italienisch)',
    },
    localizedUrl: 'https://www.example.com/it/asdfasd',
  },
  pt: {
    isActive: false,
    languageCode: 'pt',
    languageDisplayName: {
      PAGELANG: 'Portugiesisch',
      LOCALIZED: 'Português',
      HYBRID: 'Português (Portugiesisch)',
    },
    localizedUrl: 'https://www.example.com/pt/asdfasd',
  },
  ja: {
    isActive: false,
    languageCode: 'ja',
    languageDisplayName: {
      PAGELANG: 'Japanisch',
      LOCALIZED: '日本語',
      HYBRID: '日本語 (Japanisch)',
    },
    localizedUrl: 'https://www.example.com/ja/asdfasd',
  },
  zh: {
    isActive: false,
    languageCode: 'zh',
    languageDisplayName: {
      PAGELANG: 'Chinesisch',
      LOCALIZED: '中文',
      HYBRID: '中文 (Chinesisch)',
    },
    localizedUrl: 'https://www.example.com/zh/asdfasd',
  },
  ru: {
    isActive: false,
    languageCode: 'ru',
    languageDisplayName: {
      PAGELANG: 'Russisch',
      LOCALIZED: 'Русский',
      HYBRID: 'Русский (Russisch)',
    },
    localizedUrl: 'https://www.example.com/ru/asdfasd',
  },
  ko: {
    isActive: false,
    languageCode: 'ko',
    languageDisplayName: {
      PAGELANG: 'Koreanisch',
      LOCALIZED: '한국어',
      HYBRID: '한국어 (Koreanisch)',
    },
    localizedUrl: 'https://www.example.com/ko/asdfasd',
  },
  ar: {
    isActive: false,
    languageCode: 'ar',
    languageDisplayName: {
      PAGELANG: 'Arabisch',
      LOCALIZED: 'العربية',
      HYBRID: 'العربية (Arabisch)',
    },
    localizedUrl: 'https://www.example.com/ar/asdfasd',
  },
  nl: {
    isActive: false,
    languageCode: 'nl',
    languageDisplayName: {
      PAGELANG: 'Niederländisch',
      LOCALIZED: 'Nederlands',
      HYBRID: 'Nederlands (Niederländisch)',
    },
    localizedUrl: 'https://www.example.com/nl/asdfasd',
  },
  sv: {
    isActive: false,
    languageCode: 'sv',
    languageDisplayName: {
      PAGELANG: 'Schwedisch',
      LOCALIZED: 'Svenska',
      HYBRID: 'Svenska (Schwedisch)',
    },
    localizedUrl: 'https://www.example.com/sv/asdfasd',
  },
  pl: {
    isActive: false,
    languageCode: 'pl',
    languageDisplayName: {
      PAGELANG: 'Polnisch',
      LOCALIZED: 'Polski',
      HYBRID: 'Polski (Polnisch)',
    },
    localizedUrl: 'https://www.example.com/pl/asdfasd',
  },
  da: {
    isActive: false,
    languageCode: 'da',
    languageDisplayName: {
      PAGELANG: 'Dänisch',
      LOCALIZED: 'Dansk',
      HYBRID: 'Dansk (Dänisch)',
    },
    localizedUrl: 'https://www.example.com/da/asdfasd',
  },
  fi: {
    isActive: false,
    languageCode: 'fi',
    languageDisplayName: {
      PAGELANG: 'Finnisch',
      LOCALIZED: 'Suomi',
      HYBRID: 'Suomi (Finnisch)',
    },
    localizedUrl: 'https://www.example.com/fi/asdfasd',
  },
  tr: {
    isActive: false,
    languageCode: 'tr',
    languageDisplayName: {
      PAGELANG: 'Türkisch',
      LOCALIZED: 'Türkçe',
      HYBRID: 'Türkçe (Türkisch)',
    },
    localizedUrl: 'https://www.example.com/tr/asdfasd',
  },
  he: {
    isActive: false,
    languageCode: 'he',
    languageDisplayName: {
      PAGELANG: 'Hebräisch',
      LOCALIZED: 'עברית',
      HYBRID: 'עברית (Hebräisch)',
    },
    localizedUrl: 'https://www.example.com/he/asdfasd',
  },
  hu: {
    isActive: false,
    languageCode: 'hu',
    languageDisplayName: {
      PAGELANG: 'Ungarisch',
      LOCALIZED: 'Magyar',
      HYBRID: 'Magyar (Ungarisch)',
    },
    localizedUrl: 'https://www.example.com/hu/asdfasd',
  },
  fa: {
    isActive: false,
    languageCode: 'fa',
    languageDisplayName: {
      PAGELANG: 'Persisch',
      LOCALIZED: 'فارسی',
      HYBRID: 'فارسی (Persisch)',
    },
    localizedUrl: 'https://www.example.com/fa/asdfasd',
  },
};

export const dummyTranslations: CustomLanguageVariant[] = [
  {
    isActive: false,
    languageCode: 'fr',
    languageDisplayName: {
      PAGELANG: 'Französisch',
      LOCALIZED: 'Français',
      HYBRID: 'Français (Französisch)',
    },
    localizedUrl: 'https://www.example.com/fr/asdfasd',
  },
  {
    isActive: true,
    languageCode: 'de',
    languageDisplayName: {
      PAGELANG: 'Deutsch',
      LOCALIZED: 'Deutsch',
      HYBRID: 'Deutsch',
    },
    localizedUrl: 'https://www.example.com/de/asdfasd',
  },
  {
    isActive: false,
    languageCode: 'en',
    languageDisplayName: {
      PAGELANG: 'Englisch',
      LOCALIZED: 'English',
      HYBRID: 'English (Englisch)',
    },
    localizedUrl: 'https://www.example.com/asdfasd',
  },
  {
    isActive: false,
    languageCode: 'es',
    languageDisplayName: {
      PAGELANG: 'Spanisch',
      LOCALIZED: 'Español',
      HYBRID: 'Español (Spanisch)',
    },
    localizedUrl: 'https://www.example.com/es/asdfasd',
  },
  {
    isActive: false,
    languageCode: 'it',
    languageDisplayName: {
      PAGELANG: 'Italienisch',
      LOCALIZED: 'Italiano',
      HYBRID: 'Italiano (Italienisch)',
    },
    localizedUrl: 'https://www.example.com/it/asdfasd',
  },
  {
    isActive: false,
    languageCode: 'pt',
    languageDisplayName: {
      PAGELANG: 'Portugiesisch',
      LOCALIZED: 'Português',
      HYBRID: 'Português (Portugiesisch)',
    },
    localizedUrl: 'https://www.example.com/pt/asdfasd',
  },
  {
    isActive: false,
    languageCode: 'ja',
    languageDisplayName: {
      PAGELANG: 'Japanisch',
      LOCALIZED: '日本語',
      HYBRID: '日本語 (Japanisch)',
    },
    localizedUrl: 'https://www.example.com/ja/asdfasd',
  },
  {
    isActive: false,
    languageCode: 'zh',
    languageDisplayName: {
      PAGELANG: 'Chinesisch',
      LOCALIZED: '中文',
      HYBRID: '中文 (Chinesisch)',
    },
    localizedUrl: 'https://www.example.com/zh/asdfasd',
  },
  {
    isActive: false,
    languageCode: 'ru',
    languageDisplayName: {
      PAGELANG: 'Russisch',
      LOCALIZED: 'Русский',
      HYBRID: 'Русский (Russisch)',
    },
    localizedUrl: 'https://www.example.com/ru/asdfasd',
  },
  {
    isActive: false,
    languageCode: 'ko',
    languageDisplayName: {
      PAGELANG: 'Koreanisch',
      LOCALIZED: '한국어',
      HYBRID: '한국어 (Koreanisch)',
    },
    localizedUrl: 'https://www.example.com/ko/asdfasd',
  },
  {
    isActive: false,
    languageCode: 'ar',
    languageDisplayName: {
      PAGELANG: 'Arabisch',
      LOCALIZED: 'العربية',
      HYBRID: 'العربية (Arabisch)',
    },
    localizedUrl: 'https://www.example.com/ar/asdfasd',
  },
  {
    isActive: false,
    languageCode: 'nl',
    languageDisplayName: {
      PAGELANG: 'Niederländisch',
      LOCALIZED: 'Nederlands',
      HYBRID: 'Nederlands (Niederländisch)',
    },
    localizedUrl: 'https://www.example.com/nl/asdfasd',
  },
  {
    isActive: false,
    languageCode: 'sv',
    languageDisplayName: {
      PAGELANG: 'Schwedisch',
      LOCALIZED: 'Svenska',
      HYBRID: 'Svenska (Schwedisch)',
    },
    localizedUrl: 'https://www.example.com/sv/asdfasd',
  },
  {
    isActive: false,
    languageCode: 'pl',
    languageDisplayName: {
      PAGELANG: 'Polnisch',
      LOCALIZED: 'Polski',
      HYBRID: 'Polski (Polnisch)',
    },
    localizedUrl: 'https://www.example.com/pl/asdfasd',
  },
  {
    isActive: false,
    languageCode: 'da',
    languageDisplayName: {
      PAGELANG: 'Dänisch',
      LOCALIZED: 'Dansk',
      HYBRID: 'Dansk (Dänisch)',
    },
    localizedUrl: 'https://www.example.com/da/asdfasd',
  },
  {
    isActive: false,
    languageCode: 'fi',
    languageDisplayName: {
      PAGELANG: 'Finnisch',
      LOCALIZED: 'Suomi',
      HYBRID: 'Suomi (Finnisch)',
    },
    localizedUrl: 'https://www.example.com/fi/asdfasd',
  },
  {
    isActive: false,
    languageCode: 'tr',
    languageDisplayName: {
      PAGELANG: 'Türkisch',
      LOCALIZED: 'Türkçe',
      HYBRID: 'Türkçe (Türkisch)',
    },
    localizedUrl: 'https://www.example.com/tr/asdfasd',
  },
  {
    isActive: false,
    languageCode: 'he',
    languageDisplayName: {
      PAGELANG: 'Hebräisch',
      LOCALIZED: 'עברית',
      HYBRID: 'עברית (Hebräisch)',
    },
    localizedUrl: 'https://www.example.com/he/asdfasd',
  },
  {
    isActive: false,
    languageCode: 'hu',
    languageDisplayName: {
      PAGELANG: 'Ungarisch',
      LOCALIZED: 'Magyar',
      HYBRID: 'Magyar (Ungarisch)',
    },
    localizedUrl: 'https://www.example.com/hu/asdfasd',
  },
  {
    isActive: false,
    languageCode: 'fa',
    languageDisplayName: {
      PAGELANG: 'Persisch',
      LOCALIZED: 'فارسی',
      HYBRID: 'فارسی (Persisch)',
    },
    localizedUrl: 'https://www.example.com/fa/asdfasd',
  },
];
