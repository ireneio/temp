import * as LOCALE from 'locale/country';

import { DEFAULT_COUNTRY } from '../constants';

export default ({ transformLocale, lockedCountry }) => {
  const selectedCountry =
    lockedCountry.length === 0
      ? DEFAULT_COUNTRY
      : DEFAULT_COUNTRY.filter(country =>
          lockedCountry.includes(country.zh_TW),
        );

  return selectedCountry.map(country => {
    const countryValue = transformLocale(country);

    return {
      label: countryValue,
      value: countryValue,
      isLeaf: countryValue !== transformLocale(LOCALE.TAIWAN),
    };
  });
};
