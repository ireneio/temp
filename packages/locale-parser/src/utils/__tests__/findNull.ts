// import
import path from 'path';

import findNull from '../findNull';

// definition
jest.mock('../../constants', () => ({
  /* eslint-disable @typescript-eslint/camelcase */
  LOCALES: {
    zh_TW: '',
    en_US: '',
  },
  /* eslint-enable @typescript-eslint/camelcase */
}));

describe('find null', () => {
  test('not set name', () => {
    expect(() => findNull.run(['a', 'b'], 'str', null)).toThrow(
      'Set name before parsing',
    );
    expect(() => findNull.afterEach('zh_TW', {})).toThrow(
      'Set name before parsing',
    );
  });

  test('find null in next-admin@locale', () => {
    findNull.afterAll();
    findNull.beforeAll(
      path.dirname(require.resolve('@admin/server')),
      'locale.json',
      {
        a: {
          b: null,
        },
      },
    );
    findNull.afterEach('zh_TW', {
      a: {
        b: 'value',
      },
    });

    expect(findNull.run(['a', 'b'], null, 'str')).toBe('str');
    expect(findNull.run(['a', 'b'], 'str', null)).toBe('str');
  });

  test('find null in next-store@locale', () => {
    findNull.afterAll();
    findNull.beforeAll(
      path.dirname(require.resolve('@meepshop/store')),
      'locale.json',
      {
        c: {
          d: null,
        },
      },
    );
    findNull.afterEach('zh_TW', {
      c: {
        d: null,
      },
    });

    expect(findNull.run(['c', 'd'], null, null)).toBeNull();
  });

  test('find null in admin@locale', () => {
    findNull.afterAll();
    findNull.beforeAll(__dirname, 'locale.json', {
      e: {
        f: 'value',
      },
    });
    findNull.afterEach('zh_TW', {
      e: {
        f: null,
      },
    });

    expect(findNull.run(['e', 'f'], null, null)).toBeNull();
  });

  test('end', () => {
    const mockLog = jest.fn();

    global.console.log = mockLog;
    findNull.end();
    expect(mockLog).toHaveBeenCalledWith(`| next-admin@locale |||
| | zh_TW | en_US |
| a.b | value | 待補 |
| next-store@locale |||
| | zh_TW | en_US |
| c.d | 待補 | 待補 |
| admin@locale |||
| | zh_TW | en_US |
| e.f | 待補 | value |`);
  });
});
