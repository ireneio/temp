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
  computedCartInCheckout_computedCart_ComputedCart_computedLineItems as computedCartInCheckoutComputedCartComputedCartComputedLineItemsType,
} from '@meepshop/types/gqls/store';

// typescript definition
interface ValuesType {
  products: computedCartInCheckoutComputedCartComputedCartComputedLineItemsType[];
  userName?: string | null;
  userMobile?: string | null;
  userAddressAndZipCode?: {
    address: (string | undefined)[] | null;
    zipCode: string | null;
  };
  userStreet?: string | null;
}

// definition
export default (
  { resetFields }: FormInstance,
  user: useInitialValuesInCheckoutFragmentType | null,
  computedCartItems: computedCartInCheckoutComputedCartComputedCartComputedLineItemsType[],
): ValuesType | undefined => {
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
      products: computedCartItems,
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
  }, [resetTimer, computedCartItems, user]);

  const prevInitialValues = usePrevious(initialValues);

  useEffect(() => {
    if (!areEqual(prevInitialValues, initialValues)) resetFields();
  }, [resetFields, initialValues, prevInitialValues]);

  return initialValues;
};
