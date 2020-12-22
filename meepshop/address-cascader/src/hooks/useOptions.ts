// typescript import
import { CascaderOptionType } from 'antd/lib/cascader';

import { I18n, languageType } from '@meepshop/utils/lib/i18n';

// import
import { useMemo } from 'react';

// graphql typescript
import {
  useOptionsAddressServiceFragment as useOptionsAddressServiceFragmentType,
  useOptionsAddressServiceFragment_countries as useOptionsAddressServiceFragmentCountries,
  useOptionsAddressServiceFragment_countries_name as useOptionsAddressServiceFragmentCountriesName,
} from '../gqls/__generated__/useOptionsAddressServiceFragment';

// typescript definition
interface OptionsType {
  __typename: string;
  id: string;
  name: useOptionsAddressServiceFragmentCountriesName;
  children?: OptionsType[];
}

// definition
const getOptions = (
  data: OptionsType[],
  language: I18n['language'],
): CascaderOptionType[] =>
  data.map(({ id, name, children, ...d }) => ({
    ...d,
    value: id,
    label: name[language as languageType] || name.zh_TW,
    children:
      !children || children.length === 0
        ? undefined
        : getOptions(children, language),
  }));

export default (
  { countries }: useOptionsAddressServiceFragmentType,
  shippableCountries: Pick<useOptionsAddressServiceFragmentCountries, 'id'>[],
  { language }: I18n,
): ReturnType<typeof getOptions> =>
  useMemo(
    () =>
      getOptions(
        // TODO: should use shippableCountries directly, remove countries
        shippableCountries.length === 0
          ? countries
          : countries.filter(({ id }) =>
              shippableCountries.some(
                ({ id: shippableCountryId }) => shippableCountryId === id,
              ),
            ),
        language,
      ),
    [language, countries, shippableCountries],
  );
