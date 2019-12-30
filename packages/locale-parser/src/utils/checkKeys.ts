// import
import chalk from 'chalk';

import { LOCALES } from '../constants';

import getName from './getName';

// definition
class CheckKeys {
  private cache: {
    [key: string]: {
      [localeKey: string]: boolean;
    };
  } = {};

  public run = (
    keyChaining: string[],
    str: string | null,
    existingStr: string | null | undefined,
    localeKey: keyof typeof LOCALES,
  ): string | null => {
    const key = keyChaining.join('.');

    this.cache[key] = {
      ...this.cache[key],
      // eslint-disable-next-line @typescript-eslint/camelcase
      en_US: true,
      [localeKey]: existingStr !== undefined,
    };

    return existingStr || str;
  };

  public afterAll = (rootFolder: string, filename: string): void => {
    Object.keys(this.cache).forEach(key => {
      if (!Object.keys(LOCALES).every(localeKey => this.cache[key][localeKey]))
        throw new Error(
          chalk`Keys should be the same in {green ${getName(
            rootFolder,
            filename,
          )}}, but get\n\n${JSON.stringify(this.cache, null, 2)}\n`,
        );
    });
    this.cache = {};
  };
}

export default new CheckKeys();
