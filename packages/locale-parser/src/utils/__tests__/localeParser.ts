// import
import localeParser from '../localeParser';

// definition
test('locale parser', async () => {
  const baseLocale = {
    a: 'locale',
    b: {
      c: 'locale',
      d: {
        e: 'locale',
        f: null,
      },
    },
  };
  const func = jest
    .fn()
    .mockImplementation((_, str, existingStr) => existingStr || str);

  expect(
    await localeParser(
      baseLocale,
      {
        a: 'newLocale',
      },
      'zh_TW',
      func,
    ),
  ).toEqual({
    ...baseLocale,
    a: 'newLocale',
  });

  expect(func).toHaveBeenCalledWith(['a'], 'locale', 'newLocale', 'zh_TW');
  expect(func).toHaveBeenCalledWith(['b', 'c'], 'locale', undefined, 'zh_TW');
  expect(func).toHaveBeenCalledWith(
    ['b', 'd', 'e'],
    'locale',
    undefined,
    'zh_TW',
  );
  expect(func).toHaveBeenCalledWith(['b', 'd', 'f'], null, undefined, 'zh_TW');
});
