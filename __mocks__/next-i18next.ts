// import
import i18n from 'i18next';
import {
  initReactI18next,
  withTranslation,
  useTranslation,
} from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// definition
if (process.env.STORYBOOK_RUN)
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      lng: 'zh_TW',
      fallbackLng: 'zh_TW',
      interpolation: {
        escapeValue: false,
      },
    });
else
  i18n.use(initReactI18next).init({
    resources: {},
    lng: 'zh_TW',
    fallbackLng: 'zh_TW',
    interpolation: {
      escapeValue: false,
    },
  });

export default class NextI18Next {
  public withTranslation = withTranslation;

  public i18n = i18n;

  public useTranslation = useTranslation;
}
