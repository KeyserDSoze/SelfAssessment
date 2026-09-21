import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './locales.en';
import { it } from './locales.it';

const storedLanguage = localStorage.getItem('selfassessment.language');
const initialLanguage = storedLanguage === 'en' ? 'en' : 'it';

void i18n.use(initReactI18next).init({
  resources: {
    it: { translation: it },
    en: { translation: en }
  },
  lng: initialLanguage,
  fallbackLng: 'it',
  interpolation: { escapeValue: false }
});

export default i18n;
