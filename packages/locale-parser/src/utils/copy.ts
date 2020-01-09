// typescript import
import { LocaleType } from './localeParser';

import { LOCALES } from '../constants';

// import
import path from 'path';

import outputFileSync from 'output-file-sync';

// definition
class Copy {
  private relativePath = '';

  private cache: {
    [key: string]: string;
  } = {};

  public beforeAll = (
    _: string,
    __: string,
    ___: LocaleType,
    {
      relativePath,
    }: {
      relativePath: string;
    },
  ): void => {
    this.relativePath = relativePath;
    // eslint-disable-next-line import/no-dynamic-require, global-require
    this.cache = require(path.resolve(process.cwd(), relativePath));
  };

  public run = (
    _: string[],
    str: string | null,
    existingStr: string | null,
    localeKey: keyof typeof LOCALES,
  ): string | null => {
    if (existingStr) return existingStr;

    const existingKey = Object.keys(this.cache).find(
      (key: string) => this.cache[key] === str,
    );
    // eslint-disable-next-line import/no-dynamic-require, global-require, @typescript-eslint/no-var-requires
    const data = require(path.resolve(
      process.cwd(),
      path.dirname(this.relativePath),
      '..',
      localeKey,
      path.basename(this.relativePath),
    ));

    return existingKey ? data[existingKey] || null : null;
  };

  public afterEach = (
    _: keyof typeof LOCALES,
    locale: LocaleType,
    localeFilePath: string,
  ): void => {
    outputFileSync(localeFilePath, `${JSON.stringify(locale, null, 2)}\n`);
  };
}

export default new Copy();
