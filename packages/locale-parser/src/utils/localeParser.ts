// typescript import
import { LOCALES } from '../constants';

import { OptionsType } from './getOptions';

// typescript definition
export interface LocaleType {
  [key: string]: LocaleType | string | null;
}

// definition
const localeParser = async (
  baseLocale: LocaleType,
  newLocale: LocaleType,
  localeKey: keyof typeof LOCALES,
  run: OptionsType['run'],
  prefix: string[] | undefined = [],
): Promise<LocaleType> => {
  const output: LocaleType = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.keys(baseLocale)) {
    const value = baseLocale[key];

    if (value instanceof Object) {
      const newValue = newLocale[key] || {};

      if (typeof newValue === 'string')
        throw new Error(`${[...prefix, key].join('.')} must be an object`);

      // eslint-disable-next-line no-await-in-loop
      output[key] = await localeParser(value, newValue, localeKey, run, [
        ...prefix,
        key,
      ]);
    } else
      output[key] =
        // eslint-disable-next-line no-await-in-loop
        await run(
          [...prefix, key],
          value,
          newLocale[key] as string | null | undefined,
          localeKey,
        );
  }

  return output;
};

export default localeParser;
