// import
import localeParser from '../localeParser';

// definition
test('locale parser', async () => {
  const enUSLocale = {
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
      enUSLocale,
      {
        a: 'newLocale',
      },
      'zh_TW',
      func,
    ),
  ).toEqual({
    ...enUSLocale,
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
