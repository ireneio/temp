// import
import { useCallback } from 'react';

// graphql typescript
import { getValidatedConvenienceStores_validatedConvenienceStores as getValidatedConvenienceStoresValidatedConvenienceStoresType } from '@meepshop/types/gqls/meepshop';

// definition
export default (
  shipmentType?: string,
): ((
  store: getValidatedConvenienceStoresValidatedConvenienceStoresType,
) => boolean) =>
  useCallback(
    store => {
      switch (shipmentType) {
        case 'EZSHIP':
          return !store.ezshipStoreNumber;
        default:
          return !store.ecpayStoreNumber;
      }
    },
    [shipmentType],
  );
