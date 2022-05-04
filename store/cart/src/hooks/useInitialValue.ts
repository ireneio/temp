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
    type: string;
    status: string;
    quantity: number;
    productId: string;
    variantId: string;
  }[];
  shipmentId: string;
}

// definition
export default (
  { getFieldValue, resetFields }: FormInstance,
  lineItems: useInitialValueFragmentType[],
): ValuesType => {
  const initialValues = useMemo(() => {
    const shipment =
      typeof window !== 'undefined'
        ? window.sessionStorage.getItem('shipment')
        : null;
    const shipmentId = shipment ? JSON.parse(shipment).id : null;

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
      shipmentId: getFieldValue(['shipmentId']) || shipmentId,
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
