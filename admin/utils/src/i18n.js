import NextI18Next from 'next-i18next';

const i18n = new NextI18Next({
  defaultLanguage: 'zh_TW',
  otherLanguages: ['en_US', 'ja_JP'],
  localePath: 'src/static/locales',
});

export const { withNamespaces, appWithTranslation } = i18n;
export default i18n;
