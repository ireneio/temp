// import
import { useMemo } from 'react';

// graphql typescript
import { computedCart_computedCart_ComputedCart_computedLineItems as ComputedLineItemsType } from '@meepshop/types/gqls/store';

// typescript definition
export interface ValuesType {
  products: ComputedLineItemsType[];
  shipmentId: string | null;
}

// definition
export default (): ValuesType =>
  useMemo(
    () => ({
      products:
        typeof window !== 'undefined'
          ? JSON.parse(window.sessionStorage.getItem('products') || '[]')
          : [],
      shipmentId:
        typeof window !== 'undefined'
          ? JSON.parse(window.sessionStorage.getItem('shipment') || '{}').id
          : null,
    }),
    [],
  );
