import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import en from './src/locales/en.json';
import ko from './src/locales/ko.json';

const resources = {
  en: {translation: en},
  ko: {translation: ko},
};

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: cb => {
    const locales = RNLocalize.getLocales();
    cb(locales[0]?.languageCode || 'en');
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
