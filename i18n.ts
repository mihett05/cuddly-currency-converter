import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        name: 'Cuddly Currency Converter',
        from: 'From',
        lastUpdated: 'Last updated',
        toggleColor: 'Toggle color mode',
        github: 'Code repository',
      },
    },
    ru: {
      translation: {
        name: 'Приятный Конвертер Валют',
        from: 'Сумма для перевода',
        lastUpdated: 'Актуальность курса',
        toggleColor: 'Переключить цветовую тему',
        github: 'Репозиторий кода',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
});
