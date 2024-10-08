import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as resources from './resources';

i18n.use(initReactI18next).init({
  combatibilityJSON: v3,
});
