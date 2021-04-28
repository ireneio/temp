// typescript import
import { ValidationRule } from 'antd/lib/form';

// import
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { filter } from 'graphql-anywhere';
import { Cascader, Select, Input } from 'antd';

import { useTranslation } from '@meepshop/locales';

import ZipCodeInput from './ZipCodeInput';
import useOptions from './hooks/useOptions';
import useValue from './hooks/useValue';
import useZipCodes from './hooks/useZipCodes';
import styles from './styles/index.less';

// graphql typescript
import {
  getCountriesAddress as getCountriesAddressType,
  getCountriesAddress_addressService_countries as getCountriesAddressAddressServiceCountries,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { getCountriesAddress } from './gqls';
import { useOptionsAddressServiceFragment } from './gqls/useOptions';

// typescript definition
export interface PropsType {
  forwardedRef: React.Ref<HTMLDivElement>;
  className?: string;
  size?: 'small' | 'default' | 'large';
  placeholder: [string, string];
  shippableCountries: Pick<getCountriesAddressAddressServiceCountries, 'id'>[];
  value?: {
    address?: string[];
    zipCode?: string;
  };
  onChange?: (value: PropsType['value']) => void;
  onBlur?: (value: PropsType['value']) => void;
}

// definition
export const validateAddressCascader = (message: string) => (
  _: ValidationRule,
  value: { address?: string[]; zipCode?: string },
  callback: (message?: string) => void,
) => {
  if ((value?.address || []).length === 0 || !value?.zipCode) callback(message);
  else callback();
};

const AddressCascader = React.memo(
  ({
    // props
    forwardedRef,
    className,
    size,
    placeholder,
    shippableCountries,
    value,
    onChange,
    onBlur,
  }: PropsType): React.ReactElement => {
    const { i18n } = useTranslation();
    const { data } = useQuery<getCountriesAddressType>(getCountriesAddress);
    const options = useOptions(
      filter(
        useOptionsAddressServiceFragment,
        data?.addressService || { __typename: 'AddressService', countries: [] },
      ),
      shippableCountries,
      i18n,
    );
    const { address, zipCode } = useValue(options, value, onChange);
    const zipCodes = useZipCodes(options, address);

    if (options.length === 0) return <Select loading />;

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
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore FIXME: antd type error
            onBlur={() => onBlur?.(value)}
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
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore FIXME: antd type error
            onBlur={() => onBlur?.(value)}
            onChange={newZipCode =>
              onChange?.({ address, zipCode: newZipCode })
            }
            options={zipCodes}
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
