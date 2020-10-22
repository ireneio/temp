// typescript import
import { WithTranslation } from 'next-i18next';

// import
import NextI18Next from 'next-i18next';

// typescript definition
export { I18n } from 'next-i18next';

export type languageType =
  | 'zh_TW'
  | 'en_US'
  | 'ja_JP'
  | 'vi_VN'
  | 'fr_FR'
  | 'es_ES'
  | 'th_TH'
  | 'id_ID';

export interface I18nPropsType extends WithTranslation {
  t: (key: string, options?: {}) => string;
  i18n: WithTranslation['i18n'] & {
    language: languageType;
  };
}

// definition
export const languages: languageType[] = [
  'zh_TW',
  'en_US',
  'ja_JP',
  'vi_VN',
  'fr_FR',
  'es_ES',
  'th_TH',
  'id_ID',
];

const nextI18next = new NextI18Next({
  defaultLanguage: languages[0],
  otherLanguages: languages.slice(1),
  localePath: typeof window === 'undefined' ? 'src/public/locales' : 'locales',
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

export default nextI18next;
