// import
// eslint-disable-next-line import/no-extraneous-dependencies
import React, { Suspense } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import i18n from 'i18next';
import {
  initReactI18next,
  withTranslation,
  useTranslation,
  I18nextProvider,
  // eslint-disable-next-line import/no-extraneous-dependencies
} from 'react-i18next';
// eslint-disable-next-line import/no-extraneous-dependencies
import Backend from 'i18next-xhr-backend';
// eslint-disable-next-line import/no-extraneous-dependencies
import LanguageDetector from 'i18next-browser-languagedetector';
// eslint-disable-next-line import/no-extraneous-dependencies
import nextI18next from 'next-i18next';

// definition
const config = {
  lng: 'zh_TW',
  fallbackLng: 'zh_TW',
  interpolation: {
    escapeValue: false,
  },
};

if (process.env.STORYBOOK_ENV)
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      ...config,
      ns: [],
      defaultNS: 'common',
    });
else
  i18n.use(initReactI18next).init({
    ...config,
    resources: {},
  });

export default class NextI18Next {
  public withTranslation = withTranslation;

  public i18n = i18n;

  public useTranslation = useTranslation;

  public appWithTranslation = (
    Component: React.ComponentType<{}>,
  ): React.ReactNode =>
    React.memo((props: {}) => (
      <Suspense fallback="loading">
        <I18nextProvider i18n={nextI18next.i18n}>
          <Component {...props} />
        </I18nextProvider>
      </Suspense>
    ));
}
