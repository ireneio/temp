// typescript import
import i18next from 'i18next';

// import
import NextI18Next from 'next-i18next';

// typescript definition
export interface I18nPropsType {
  t: (key: string) => string;
  i18n: i18next.i18n & {
    language: 'zh_TW' | 'en_US' | 'ja_JP' | 'vi_VN';
  };
}

// definition
const nextI18next = new NextI18Next({
  defaultLanguage: 'zh_TW',
  otherLanguages: ['en_US', 'ja_JP', 'vi_VN'],
  localePath: 'src/static/locales',
  // we use 'null' to fall back
  fallbackLng: 'zh_TW',
  returnNull: false,
});

export const { withNamespaces, appWithTranslation, i18n } = nextI18next;

export default nextI18next;
