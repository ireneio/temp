// graphql typescript
import { CascaderOptionType } from 'antd/lib/cascader';

import { I18nPropsType } from '@meepshop/utils/lib/i18n';

// import
import { useMemo } from 'react';
import gql from 'graphql-tag';

// graphql typescript
import { localeFragmentType } from '@meepshop/utils/lib/fragments/locale';

import {
  useOptionsFragment as useOptionsFragmentType,
  useOptionsFragment_countries as useOptionsFragmentCountries,
} from './__generated__/useOptionsFragment';

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
export const useOptionsFragment = gql`
  fragment useOptionsFragment on AddressService {
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
  language: I18nPropsType['i18n']['language'],
): CascaderOptionType[] =>
  data.map(({ id, name, children, ...d }) => ({
    ...d,
    value: id,
    label: name[language] || name.zh_TW,
    children:
      !children || children.length === 0
        ? undefined
        : getOptions(children, language),
  }));

export default (
  { countries }: useOptionsFragmentType,
  shippableCountries: Pick<useOptionsFragmentCountries, 'id'>[],
  { language }: I18nPropsType['i18n'],
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
