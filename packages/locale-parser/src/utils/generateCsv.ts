// import
import path from 'path';

import outputFileSync from 'output-file-sync';

import getName from './getName';
import sendGlip from './sendGlip';

import { LOCALES } from '../constants';

// definition
class GenerateCsv {
  private name: string | null = null;

  private cache: {
    [key: string]: {
      en_US: string | null;
      [localeKey: string]: string | null;
    };
  } = {};

  private output: string[] = [];

  public beforeAll = (rootFolder: string, filename: string): void => {
    this.name = getName(rootFolder, filename);

    this.output.push(this.name);
    Object.keys(LOCALES).forEach(() => {
      this.output.push(`,`);
    });
    this.output.push('\n');
    Object.keys(LOCALES).forEach(localeKey => {
      this.output.push(`,${localeKey}`);
    });
    this.output.push('\n');
  };

  public run = (
    keyChaining: string[],
    str: string | null,
    existingStr: string | null,
    localeKey: keyof typeof LOCALES,
  ): string | null => {
    const key = keyChaining.join('.');

    this.cache[key] = {
      ...this.cache[key],
      // eslint-disable-next-line @typescript-eslint/camelcase
      en_US: str,
      [localeKey]: existingStr,
    };

    return existingStr;
  };

  public afterAll = (): void => {
    Object.keys(this.cache).forEach(key => {
      if (!Object.keys(LOCALES).every(localeKey => this.cache[key][localeKey]))
        return;

      this.output.push(key);

      Object.keys(LOCALES).forEach(localeKey => {
        const data = this.cache[key][localeKey];

        if (!data) return;

        if (/,/.test(data)) this.output.push(`,"${data}"`);
        else this.output.push(`,${data}`);
      });
      this.output.push('\n');
    });

    Object.keys(LOCALES).forEach(() => {
      this.output.push(`,`);
    });
    this.output.push('\n');
  };

  public end = (): void => {
    const fileName = `${this.name?.replace(/@.*$/, '')}.csv`;

    outputFileSync(
      path.resolve(__dirname, '../../../../locales', fileName),
      this.output.join(''),
    );

    if (process.env.CIRCLE_TAG)
      sendGlip(
        `${process.env.CIRCLE_TAG}: https://${process.env.CIRCLE_BUILD_NUM}-140218068-gh.circle-artifacts.com/0/locales/${fileName}`,
      );
  };
}

export default new GenerateCsv();
