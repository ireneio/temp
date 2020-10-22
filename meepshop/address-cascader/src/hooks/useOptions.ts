// typescript import
import { I18n, languageType } from '@meepshop/utils/lib/i18n';

// graphql typescript
import { CascaderOptionType } from 'antd/lib/cascader';

// import
import { useMemo } from 'react';
import gql from 'graphql-tag';

// graphql typescript
import { localeFragmentType } from '@meepshop/utils/lib/fragments/locale';

import {
  useOptionsAddressServiceFragment as useOptionsAddressServiceFragmentType,
  useOptionsAddressServiceFragment_countries as useOptionsAddressServiceFragmentCountries,
} from './__generated__/useOptionsAddressServiceFragment';

// graphql import
import localeFragment from '@meepshop/utils/lib/fragments/locale';

// typescript definition
interface OptionsType {
  __typename: string;
  id: string;
  name: localeFragmentType;
  children?: OptionsType[];
}

// definition
export const useOptionsAddressServiceFragment = gql`
  fragment useOptionsAddressServiceFragment on AddressService {
    countries {
      id
      name {
        ...localeFragment
      }

      children: cities {
        id
        name {
          ...localeFragment
        }

        children: areas {
          id
          name {
            ...localeFragment
          }
          zipCodes
        }
      }
    }
  }

  ${localeFragment}
`;

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
