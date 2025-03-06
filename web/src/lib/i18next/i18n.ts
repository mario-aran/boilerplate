// "i18next": Copied from https://react.i18next.com/latest/using-with-hooks

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// Translation imports
import defaultEn from './locales/default-en.json';
import { es } from './locales/es';

// Types
export type Language = keyof typeof resources;

// Constants
export const DEFAULT_NS = 'ns1';
export const DEFAULT_LANGUAGE = 'en';

// Define translations
export const resources = {
  en: { [DEFAULT_NS]: defaultEn },
  es: { [DEFAULT_NS]: es },
};

// Settings
i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources, // Load translations
    defaultNS: DEFAULT_NS, // Default namespace
    fallbackLng: DEFAULT_LANGUAGE, // Default language
    supportedLngs: Object.keys(resources) as Language[], // Supported languages
    interpolation: {
      escapeValue: false, // Not needed for react as it escapes by default
    },

    // "i18next-browser-languagedetector"
    detection: {
      order: ['localStorage', 'navigator'], // Detection order
      caches: ['localStorage'], // Where to persist user language
    },
  });

export { i18n };
