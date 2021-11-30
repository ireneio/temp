// import
import NextI18Next from 'next-i18next';
import path from 'path';

import { languages } from './constants';

// definition
const nextI18next = new NextI18Next({
  defaultLanguage: languages[0],
  otherLanguages: languages.slice(1),
  localePath:
    typeof window === 'undefined'
      ? path.resolve('src/public/locales')
      : path.resolve('locales'),
  // we use 'null' to fall back
  fallbackLng: languages[0],
  returnNull: false,
});

export const {
  withTranslation,
  appWithTranslation,
  i18n,
  useTranslation,
} = nextI18next;
