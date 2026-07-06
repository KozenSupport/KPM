import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './resources';

function initialLanguage() {
  const hash = window.location.hash || '';
  const isPortal = hash.includes('/customer-login') || hash.includes('/customer-portal');
  if (isPortal) return window.localStorage.getItem('kpm.portal.language') || 'en-US';
  return window.localStorage.getItem('kpm.language') || 'zh-CN';
}

void i18next.use(initReactI18next).init({
  lng: initialLanguage(),
  fallbackLng: 'zh-CN',
  interpolation: { escapeValue: false },
  resources,
});

export default i18next;
