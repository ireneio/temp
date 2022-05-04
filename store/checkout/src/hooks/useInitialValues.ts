// typescript import
import { FormInstance } from 'antd/lib/form';

// import
import { useMemo, useEffect } from 'react';
import { usePrevious } from 'react-use';
import { areEqual } from 'fbjs';

import useResetTimer from './useResetTimer';
import { PRESERVED_FIELDS } from '../constants';

// graphql typescript
import {
  useInitialValuesInCheckoutFragment as useInitialValuesInCheckoutFragmentType,
  computedCart_computedCart_ComputedCart_computedLineItems_applicableShipments as ShipmentType,
} from '@meepshop/types/gqls/store';

// typescript definition
export interface ValuesType {
  userName?: string | null;
  userMobile?: string | null;
  userAddressAndZipCode?: {
    address: (string | undefined)[] | null;
    zipCode: string | null;
  };
  userStreet?: string | null;
  shipment?: ShipmentType;
  products?: {
    productId: string;
    variantId: string;
    quantity: number;
  }[];
}

// definition
export default (
  { resetFields }: FormInstance,
  user: useInitialValuesInCheckoutFragmentType | null,
): ValuesType => {
  const resetTimer = useResetTimer();

  const initialValues = useMemo(() => {
    resetTimer();

    const preservedInfo = PRESERVED_FIELDS.reduce((values, field) => {
      let value =
        typeof window !== 'undefined'
          ? window.sessionStorage.getItem(field)
          : '';

      if (!value) return values;

      if (
        field === 'addressAndZipCode' ||
        field === 'shipment' ||
        field === 'products'
      )
        value = JSON.parse(value);

      return {
        ...values,
        [field]: field === 'invoice' ? value?.split(',') || [] : value,
      };
    }, {});

    return {
      userName: user?.name,
      userMobile: user?.mobile,
      userAddressAndZipCode: !user?.address
        ? undefined
        : {
            address: [
              user.address.country?.id,
              user.address.city?.id,
              user.address.area?.id,
            ].filter(Boolean),
            zipCode: user.address.zipCode,
          },
      userStreet: user?.address?.street,
      ...preservedInfo,
    };
  }, [resetTimer, user]);

  const prevInitialValues = usePrevious(initialValues);

  useEffect(() => {
    if (!areEqual(prevInitialValues, initialValues)) resetFields();
  }, [resetFields, initialValues, prevInitialValues]);

  return initialValues;
};
