// graphql typescript
import { CascaderOptionType } from 'antd/lib/cascader';

import { I18nPropsType } from '@store/utils/lib/i18n';

// import
import React, { useMemo, useState, useEffect } from 'react';
import { Query } from '@apollo/react-components';
import gql from 'graphql-tag';
import { Cascader, Select, Input } from 'antd';

import ZipCodeInput from './ZipCodeInput';
import styles from './styles/index.less';

// graphql typescript
import {
  getCountriesAddress,
  getCountriesAddress_addressService_countries as getCountriesAddressAddressServiceCountries,
  getCountriesAddress_getColorList as getCountriesAddressGetColorList,
} from './__generated__/getCountriesAddress';

// graphql import
import { colorListFragment } from '@store/apollo-client-resolvers/lib/ColorList';
import localeFragment from '@store/utils/lib/fragments/locale';

// typescript definition
interface PropsType extends Pick<I18nPropsType, 'i18n'> {
  forwardedRef: React.Ref<HTMLDivElement>;
  className?: string;
  size?: 'small' | 'default' | 'large';
  placeholder: [string, string];
  lockedCountry?: string[];
  value?: {
    address?: string[];
    zipCode?: string;
  };
  onChange?: (value: { address?: string[]; zipCode?: string }) => void;
  countries: getCountriesAddressAddressServiceCountries[];
  colors: getCountriesAddressGetColorList['colors'];
}

interface OptionsType {
  __typename: string;
  id: string;
  name: {
    __typename: 'Locale';
    zh_TW: string | null;
    en_US: string | null;
    ja_JP: string | null;
    vi_VN: string | null;
  };
  children?: OptionsType[];
}

// definition
const getOptions = (
  data: OptionsType[],
  language: PropsType['i18n']['language'],
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

const findZipcodes = (
  options: CascaderOptionType[],
  address: string[] | undefined,
): null | string[] => {
  const [id, ...otherIds]: string[] = address || [];
  const option = options.find(({ value }) => value === id);
  const zipCodes = option?.zipCodes;

  if (zipCodes) return zipCodes;

  if (!option || otherIds.length === 0) return null;

  return findZipcodes(option.children || [], otherIds);
};

const AddressCascader = React.memo(
  ({
    // props
    forwardedRef,
    i18n,
    className,
    size,
    placeholder,
    lockedCountry,
    value,
    onChange: propsOnChange,
    countries,
    colors,
  }: PropsType): React.ReactElement => {
    const [
      { address = undefined, zipCode = undefined } = {},
      onChange,
    ] = propsOnChange ? [value, propsOnChange] : useState(value);
    const options = useMemo(
      () =>
        getOptions(
          !lockedCountry || lockedCountry.length === 0
            ? countries
            : countries.filter(({ id }) => lockedCountry.includes(id)),
          i18n.language,
        ),
      [i18n.language, countries, lockedCountry],
    );
    const zipCodes = useMemo(() => findZipcodes(options, address), [
      options,
      address,
    ]);
    const addressLength = (address || []).length;
    const isOnlyOneOption = options.length === 1;
    const isSelectAddress = addressLength !== 0;

    if (isOnlyOneOption)
      useEffect(() => {
        if (addressLength === 0 && !options[0].children)
          onChange({
            address: [options[0].value as string],
            zipCode,
          });
      }, [options.length, addressLength, onChange, zipCode, options]);

    return (
      <div
        ref={forwardedRef}
        className={`${styles.root} ${
          !isSelectAddress || addressLength === 1 ? '' : styles.selectZipCode
        } ${className}`}
      >
        {isOnlyOneOption && !options[0].children ? (
          <Input size={size} value={options[0].label as string} disabled />
        ) : (
          <Cascader
            size={size}
            placeholder={placeholder[0]}
            value={!address || !isOnlyOneOption ? address : address.slice(1)}
            onChange={newAddress => {
              onChange({
                address: !isOnlyOneOption
                  ? newAddress
                  : [options[0].value as string, ...newAddress],
                zipCode: undefined,
              });
            }}
            options={!isOnlyOneOption ? options : options[0].children}
            displayRender={label =>
              (!isSelectAddress || !isOnlyOneOption
                ? label
                : [options[0].label, ...label]
              ).join(' / ')
            }
          />
        )}

        {!isSelectAddress ? null : (
          <ZipCodeInput
            size={size}
            placeholder={placeholder[1]}
            value={zipCode}
            onChange={newZipCode => {
              onChange({ address, zipCode: newZipCode });
            }}
            options={zipCodes}
            colors={colors}
          />
        )}
      </div>
    );
  },
);

export default React.forwardRef(
  (
    props: Omit<PropsType, 'forwardedRef' | 'countries' | 'colors'>,
    ref: PropsType['forwardedRef'],
  ) => (
    <Query<getCountriesAddress>
      query={gql`
        query getCountriesAddress {
          addressService {
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
          getColorList {
            ...colorListFragment
          }
        }
        ${colorListFragment}
        ${localeFragment}
      `}
    >
      {({ loading, error, data }) => {
        if (loading || error || !data) return <Select loading />;

        const {
          addressService: { countries },
          getColorList,
        } = data;

        // FIXME should not be null
        if (!getColorList) return <Select loading />;

        return (
          <AddressCascader
            {...props}
            forwardedRef={ref}
            countries={countries}
            colors={getColorList.colors}
          />
        );
      }}
    </Query>
  ),
);
