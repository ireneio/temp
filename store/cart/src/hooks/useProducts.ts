// typescript import
import { ValuesType } from './useInitialValue';

// import
import { useMemo } from 'react';

// graphql typescript
import { productsLineItemFragment as productsLineItemFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  requireDesignatedShipment: boolean;
  computedLineItems: productsLineItemFragmentType[];
  shipmentId: ValuesType['shipmentId'];
}

interface ReturnType {
  availableItems: productsLineItemFragmentType[];
  unvailableItems: productsLineItemFragmentType[];
}

// definition
export default ({
  requireDesignatedShipment,
  computedLineItems,
  shipmentId,
}: PropsType): ReturnType => {
  return useMemo(
    () =>
      !requireDesignatedShipment || !shipmentId
        ? {
            availableItems: computedLineItems,
            unvailableItems: [],
          }
        : computedLineItems.reduce<ReturnType>(
            (list, item) => {
              const available = item.applicableShipments?.find(
                shipment => shipment.id === shipmentId,
              );

              if (!available) list.unvailableItems.push(item);
              else list.availableItems.push(item);

              return list;
            },
            {
              availableItems: [],
              unvailableItems: [],
            },
          ),
    [computedLineItems, requireDesignatedShipment, shipmentId],
  );
};
