// typescript import
import { WithTranslation } from 'next-i18next';

// import
import NextI18Next from 'next-i18next';

// typescript definition
export interface I18nPropsType extends WithTranslation {
  t: (key: string, options?: {}) => string;
  i18n: WithTranslation['i18n'] & {
    language: 'zh_TW' | 'en_US' | 'ja_JP';
  };
}

// definition
const nextI18next = new NextI18Next({
  defaultLanguage: 'zh_TW',
  otherLanguages: ['en_US', 'ja_JP'],
  localePath: !process.browser ? 'src/public/locales' : 'locales',
  // we use 'null' to fall back
  fallbackLng: 'zh_TW',
  returnNull: false,
});

export const {
  withTranslation,
  appWithTranslation,
  i18n,
  useTranslation,
} = nextI18next;

export default nextI18next;
