import { warning } from 'fbjs';

const transformLocale = locale => (strings, ...locales) => {
  /** transform locale object */
  if (!(strings instanceof Array)) {
    const { TODO_LOCALE, ...textObj } = strings || {};

    warning(
      textObj[locale] !== undefined,
      `${locale} is not defined in ${JSON.stringify(textObj)}.`,
    );

    /** TODO: can not transform from data */
    if (!TODO_LOCALE) return textObj.zh_TW;

    /** TODO: for production */
    return textObj[locale] || textObj.zh_TW;
  }

  /** transform locale template */
  return strings.reduce(
    (result, string, index) =>
      `${result}${string}${
        !(locales[index] instanceof Object)
          ? locales[index] || ''
          : transformLocale(locales[index])
      }`,
    '',
  );
};

export default transformLocale;
