import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

void i18next.use(initReactI18next).init({
  lng: 'zh-CN',
  fallbackLng: 'en-US',
  interpolation: { escapeValue: false },
  resources: {
    'zh-CN': {
      translation: {
        title: 'Kozen Project Management',
        subtitle: 'KPM 微服务开发环境已准备就绪',
        gateway: 'API 网关',
        prototype: '原型文件仍保留在 apps/frontend/prototype'
      }
    },
    'en-US': {
      translation: {
        title: 'Kozen Project Management',
        subtitle: 'KPM microservice development workspace is ready',
        gateway: 'API Gateway',
        prototype: 'The prototype remains in apps/frontend/prototype'
      }
    }
  }
});

export default i18next;
