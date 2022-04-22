// typescript import
import { FormInstance } from 'antd/lib/form';

// import
import { useMemo, useEffect } from 'react';
import { usePrevious } from 'react-use';
import { areEqual } from 'fbjs';

// graphql typescript
import { useInitialValueFragment as useInitialValueFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
export interface ValuesType {
  products: {
    quantity: number;
    status: string;
    type: string;
  }[];
}

// definition
export default (
  { getFieldValue, resetFields }: FormInstance,
  lineItems: useInitialValueFragmentType[],
): ValuesType => {
  const initialValues = useMemo(() => {
    return {
      products: lineItems.map(
        ({ quantity, status, type, productId, variantId }) => ({
          type,
          status,
          quantity: quantity || 0,
          productId,
          variantId,
        }),
      ),
      shipmentId: getFieldValue(['shipmentId']),
    };
  }, [lineItems, getFieldValue]);
  const prevInitialValues = usePrevious(initialValues);

  useEffect(() => {
    if (!areEqual(prevInitialValues, initialValues)) {
      resetFields();
    }
  }, [resetFields, initialValues, prevInitialValues]);

  return initialValues;
};
