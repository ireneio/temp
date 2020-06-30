// definition
jest.mock('../../../constants', () => ({
  /* eslint-disable @typescript-eslint/camelcase */
  LOCALES: {
    zh_TW: '',
    en_US: '',
    ja_JP:
      'https://translate.google.com/?hl=zh-TW#view=home&op=translate&sl=en&tl=ja',
  },
  /* eslint-enable @typescript-eslint/camelcase */
}));
