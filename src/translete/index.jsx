import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import languageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const loadPath = (languages, namespaces) => {
    return `/src/locales/${languages[0]}/${namespaces[0]}.json`;
};

i18n.use(Backend).use(languageDetector).use(initReactI18next).init({
    fallbackLng: localStorage.getItem("language") || 'en',
    detection: {
        order: ['queryString', 'cookie'],
        cache: ['cookie'],
    },
    backend: {
        loadPath: loadPath, 
    },
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;