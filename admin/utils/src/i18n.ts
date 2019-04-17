// typescript import
import i18next from 'i18next';

// import
import NextI18Next from 'next-i18next';

// typescript definition
export interface I18nPropsType {
  t: (key: string) => string;
  i18n: i18next.i18n & {
    language: 'zh_TW' | 'en_US' | 'ja_JP';
  };
}

// definition
const i18n = new NextI18Next({
  defaultLanguage: 'zh_TW',
  otherLanguages: ['en_US', 'ja_JP'],
  localePath: 'src/static/locales',
});

export const { withNamespaces, appWithTranslation } = i18n;

export default i18n;
