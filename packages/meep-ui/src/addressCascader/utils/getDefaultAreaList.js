import * as LOCALE from 'locale/country';

const DEFAULT_COUNTRY = Object.keys(LOCALE).map(key => LOCALE[key]);

export default ({ transformLocale, lockedCountry }) =>
  (lockedCountry.length === 0
    ? DEFAULT_COUNTRY
    : DEFAULT_COUNTRY.filter(country => lockedCountry.includes(country.zh_TW))
  ).map(country => {
    const countryValue = transformLocale(country);

    return {
      label: countryValue,
      value: countryValue,
      isLeaf: countryValue !== transformLocale(LOCALE.TAIWAN),
    };
  });
