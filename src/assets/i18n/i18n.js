import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './en.json';
import ar from './ar.json';

i18next.use(initReactI18next).init({
  lng: 'en', // Set the default language here
  fallbackLng: 'en', // Fallback language if translation is missing
  resources: {
    en: {translation: en},
    ar: {translation: ar},
  },
});
