// typescript import
import { LocaleType } from './localeParser';

// import
import path from 'path';

import outputFileSync from 'output-file-sync';

import getName from './getName';

import { LOCALES } from '../constants';

// typescript definition
interface CacheType {
  en_US: string | null;
  [localeKey: string]: string | null;
}

// definition
class Generate {
  private name: string | null = null;

  private cache: {
    [key: string]: CacheType;
  } = {};

  private output: {
    [key: string]: (CacheType & {
      key: string;
    })[];
  } = {};

  private outputFolder = '';

  private type = 'json';

  public beforeAll = (
    rootFolder: string,
    filename: string,
    _: LocaleType,
    {
      outputFolder,
      type,
    }: {
      outputFolder: string;
      type: string;
    },
  ): void => {
    this.name = getName(rootFolder, filename);
    this.outputFolder = outputFolder;
    this.type = type || 'json';
    this.cache = {};
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
    if (!this.name) return;

    this.output[this.name] = Object.keys(this.cache).map(key => ({
      ...this.cache[key],
      key,
    }));
  };

  public end = (): void => {
    const fileName = [this.name?.replace(/@.*$/, ''), this.type].join('.');

    outputFileSync(
      path.resolve(this.outputFolder, fileName),
      this.type !== 'csv' ? this.generateJSON() : this.generateCsv(),
    );
  };

  private generateJSON = (): string => JSON.stringify(this.output);

  private generateCsv = (): string => {
    const content: string[] = [];

    Object.entries(this.output).forEach(([name, localeData]) => {
      content.push(name);
      Object.keys(LOCALES).forEach(() => {
        content.push(`,`);
      });
      content.push('\n');
      Object.keys(LOCALES).forEach(localeKey => {
        content.push(`,${localeKey}`);
      });
      content.push('\n');

      localeData.forEach(data => {
        if (!Object.keys(LOCALES).every(localeKey => data[localeKey])) return;

        content.push(data.key);
        Object.keys(LOCALES).forEach(localeKey => {
          const locale = data[localeKey];

          if (!locale) return;

          if (/,/.test(locale)) content.push(`,"${locale}"`);
          else content.push(`,${locale}`);
        });
        content.push('\n');
      });

      Object.keys(LOCALES).forEach(() => {
        content.push(`,`);
      });
      content.push('\n');
    });

    return content.join('');
  };
}

export default new Generate();
