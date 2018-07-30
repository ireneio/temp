import { invariant } from 'fbjs';
import chalk from 'chalk';
import uuid from 'uuid';
import { sample } from 'lodash';
import { isInt, isFloat } from 'validator';

/* eslint-disable import/no-unresolved, import/extensions */
import LOCALE from '__toolMeepUI__/constants/locale';
import CURRENCY from '__toolMeepUI__/constants/currency';
/* eslint-enable import/no-unresolved, import/extensions */

const handleTest = testValues => {
  switch (testValues) {
    case 'uuid':
      return [
        {
          func: () => uuid.v4(),
        },
      ];
    case 'fbID':
      return [
        {
          func: () =>
            Math.floor(
              Math.random() * 9999999999999999 + 1000000000000000,
            ).toString(),
        },
      ];
    case 'oneOfLocale':
      return LOCALE;
    case 'oneOfCurrency':
      return CURRENCY;
    default:
      return testValues
        .replace(/ |\n/g, '')
        .replace(/([^\\])_/g, '$1 ')
        .replace(/\\_/g, '_')
        .split(/,/g)
        .map(value => {
          if (isFloat(value)) return parseFloat(value);
          if (isInt(value)) return parseInt(value, 10);
          return value;
        });
  }
};

const handleRandom = (testValues, isTesting) => {
  const values = handleTest(testValues);

  if (!isTesting) return values;

  return [
    {
      isTesting: () => sample(values),
    },
  ];
};

export default (description = '', isTesting) => {
  invariant(
    isTesting !== undefined,
    chalk`{red isTesting} can not be {red undefined}.`,
  );

  return description
    .split(/\|/g)
    .map(text =>
      text
        .replace(/\s\s+/g, ' ')
        .replace(/\n/g, '')
        .replace(/^[ ](.*)$/, '$1')
        .replace(/^(.*)[ ]$/, '$1'),
    )
    .reduce(
      (result, text) => {
        if (/^testJSON[ ]?/.test(text)) {
          return {
            ...result,
            data: JSON.parse(text.replace(/^testJSON[ ]?/, '')),
          };
        }

        if (/^testRandom[ ]?/.test(text)) {
          return {
            ...result,
            data: handleRandom(text.replace(/^testRandom[ ]?/, ''), isTesting),
          };
        }

        if (/^test[ ]?/.test(text)) {
          return {
            ...result,
            data: handleTest(text.replace(/^test[ ]?/, '')),
          };
        }

        return {
          ...result,
          name: text,
        };
      },
      {
        name: '',
        data: [],
      },
    );
};
