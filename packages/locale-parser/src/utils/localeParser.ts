// typescript import
import { LOCALES } from '../constants';

import { CliOptionsType } from './cliOptions';

// typescript definition
export interface LocaleType {
  [key: string]: LocaleType | string | null;
}

// definition
const localeParser = async (
  enUSLocale: LocaleType,
  newLocale: LocaleType,
  localeKey: keyof typeof LOCALES,
  run: CliOptionsType['run'],
  prefix: string[] | undefined = [],
): Promise<LocaleType> => {
  const output: LocaleType = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.keys(enUSLocale)) {
    const value = enUSLocale[key];

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
