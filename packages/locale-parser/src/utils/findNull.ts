// typescript import
import { LocaleType } from './localeParser';

// import
import { LOCALES } from '../constants';

import getName from './getName';

// definition
class FindNull {
  private cache: {
    [key: string]: boolean;
  } = {};

  private data: {
    [key: string]: LocaleType;
  } = {};

  private name: string | null = null;

  private addData = (
    localeKey: keyof typeof LOCALES,
    locale: LocaleType,
  ): void => {
    if (!this.name) throw new Error('Set name before parsing');

    this.data[this.name] = {
      ...this.data[this.name],
      [localeKey]: locale,
    };
  };

  private sendMessage = async (message: string[]): Promise<void> => {
    const { log } = console;

    log(
      message
        .join('\n')
        .replace(/\[(.*?)\]\(.*?\)/g, '$1')
        .replace(/\*\*/g, ''),
    );
  };

  public beforeAll = (
    rootFolder: string,
    filename: string,
    baseLocale: LocaleType,
  ): void => {
    this.name = getName(rootFolder, filename);
    this.addData('en_US', baseLocale);
  };

  public run = (
    keyChaining: string[],
    str: string | null,
    existingStr: string | null,
  ): string | null => {
    if (existingStr) return existingStr;

    if (!this.name) throw new Error('Set name before parsing');

    this.cache[[this.name, ...keyChaining].join('.')] = true;

    return str;
  };

  public afterEach = this.addData;

  public afterAll = (): void => {
    this.name = null;
  };

  public end = async (): Promise<void> => {
    this.name = null;

    const messages = Object.keys(this.cache).reduce(
      (result: string[], keyChaining: string) => {
        const [name, ...keys] = keyChaining.split('.');

        if (name !== this.name) {
          this.name = name;

          result.push(
            `| **${this.name}** |${[].constructor
              .apply({}, new Array(Object.keys(LOCALES).length))
              .join('|')}|`,
            `| | **${Object.keys(LOCALES)
              .map(localeKey => localeKey)
              .join('** | **')}** |`,
          );
        }

        return [
          ...result,
          `| **${keys.join('.')}** | ${Object.keys(LOCALES)
            .map(
              localeKey =>
                keys.reduce(
                  (data: LocaleType, key: string) => data?.[key],
                  this.data[name][localeKey],
                ) || '待補',
            )
            .join(' | ')} |`,
        ];
      },
      [],
    );
    let output = [];

    // eslint-disable-next-line no-restricted-syntax, no-await-in-loop
    for (const message of messages) {
      output.push(message);

      if (output.length > 50) {
        // eslint-disable-next-line no-await-in-loop
        await this.sendMessage(output);
        output = [];
      }
    }

    if (output.length !== 0) await this.sendMessage(output);
  };
}

export default new FindNull();
