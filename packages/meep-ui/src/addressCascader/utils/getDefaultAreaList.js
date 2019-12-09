import * as LOCALE from 'locale/country';

const DEFAULT_COUNTRY = Object.keys(LOCALE).map(key => LOCALE[key]);

export default ({ i18n, lockedCountry }) =>
  (lockedCountry.length === 0
    ? DEFAULT_COUNTRY
    : DEFAULT_COUNTRY.filter(country => lockedCountry.includes(country.zh_TW))
  ).map(country => {
    const countryValue = country[i18n.language] || country.zh_TW;

    return {
      label: countryValue,
      value: countryValue,
      isLeaf:
        countryValue !== (LOCALE.TAIWAN[i18n.language] || LOCALE.TAIWAN.zh_TW),
    };
  });
