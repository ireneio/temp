// typescript import
import { ValidationRule } from 'antd/lib/form';

// graphql typescript
import { I18nPropsType } from '@store/utils/lib/i18n';

// import
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';
import { Cascader, Select, Input } from 'antd';

import ZipCodeInput from './ZipCodeInput';
import useOptions from './hooks/useOptions';
import useValue from './hooks/useValue';
import useZipCodes from './hooks/useZipCodes';
import styles from './styles/index.less';

// graphql typescript
import {
  getCountriesAddress,
  getCountriesAddress_addressService_countries as getCountriesAddressAddressServiceCountries,
} from './__generated__/getCountriesAddress';

// graphql import
import { colorListFragment } from '@store/apollo-client-resolvers/lib/ColorList';

import { useOptionsFragment } from './hooks/useOptions';

// typescript definition
interface PropsType extends Pick<I18nPropsType, 'i18n'> {
  forwardedRef: React.Ref<HTMLDivElement>;
  className?: string;
  size?: 'small' | 'default' | 'large';
  placeholder: [string, string];
  shippableCountries: Pick<getCountriesAddressAddressServiceCountries, 'id'>[];
  value?: {
    address?: string[];
    zipCode?: string;
  };
  onChange?: (value: { address?: string[]; zipCode?: string }) => void;
}

// definition
const query = gql`
  query getCountriesAddress {
    addressService {
      ...useOptionsFragment
    }

    getColorList {
      ...colorListFragment
    }
  }

  ${colorListFragment}
  ${useOptionsFragment}
`;

export const validateAddressCascader = (message: string) => (
  _: ValidationRule,
  value: { address?: string[]; zipCode?: string },
  callback: (message?: string) => void,
) => {
  if (!value?.address?.length) callback(message);
  else callback();
};

const AddressCascader = React.memo(
  ({
    // props
    forwardedRef,
    i18n,
    className,
    size,
    placeholder,
    shippableCountries,
    onChange,
    value,
  }: PropsType): React.ReactElement => {
    const { data } = useQuery<getCountriesAddress>(query);
    const options = useOptions(
      filter(
        useOptionsFragment,
        data?.addressService || { __typename: 'AddressService', countries: [] },
      ),
      shippableCountries,
      i18n,
    );
    const { address, zipCode } = useValue(options, value, onChange);
    const zipCodes = useZipCodes(options, address);
    const colors = data?.getColorList?.colors;

    if (!colors || options.length === 0) return <Select loading />;

    const isOnlyOneOption = options.length === 1;
    const isSelectAddress = (address || []).length !== 0;

    return (
      <div
        ref={forwardedRef}
        className={`${styles.root} ${
          !isSelectAddress || address?.length === 1 ? '' : styles.selectZipCode
        } ${className}`}
      >
        {isOnlyOneOption && !options[0].children ? (
          <Input size={size} value={options[0].label as string} disabled />
        ) : (
          <Cascader
            size={size}
            placeholder={placeholder[0]}
            value={!address || !isOnlyOneOption ? address : address.slice(1)}
            onChange={newAddress =>
              onChange?.({
                address:
                  !isOnlyOneOption || newAddress.length === 0
                    ? newAddress
                    : [options[0].value as string, ...newAddress],
                zipCode: undefined,
              })
            }
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
            onChange={newZipCode =>
              onChange?.({ address, zipCode: newZipCode })
            }
            options={zipCodes}
            colors={colors}
          />
        )}
      </div>
    );
  },
);

export default React.forwardRef(
  (props: Omit<PropsType, 'forwardedRef'>, ref: PropsType['forwardedRef']) => (
    <AddressCascader {...props} forwardedRef={ref} />
  ),
);
