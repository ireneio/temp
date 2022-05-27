// import
import { useMemo } from 'react';

// graphql typescript
import {
  useShipmentsFragment as useShipmentsFragmentType,
  useShipmentsFragment_applicableShipments as useShipmentsFragmentApplicableShipmentsType,
} from '@meepshop/types/gqls/store';

// definition
export default (
  lineItems: useShipmentsFragmentType[],
): {
  shipments: useShipmentsFragmentApplicableShipmentsType[];
  requireDesignatedShipment: boolean;
} => ({
  shipments: useMemo(
    () =>
      lineItems
        .reduce((result, { type, applicableShipments }) => {
          if (type === 'GIFT') return result;

          return (applicableShipments || []).reduce(
            (shipments, shipment) =>
              shipments.find(({ id }) => id === shipment.id)
                ? shipments
                : [...shipments, shipment],
            result,
          );
        }, [])
        .sort(
          (a, b) =>
            new Date(b.createdAt || '').getTime() -
            new Date(a.createdAt || '').getTime(),
        ),
    [lineItems],
  ),
  requireDesignatedShipment: useMemo(
    () =>
      lineItems.some(
        ({ type, requireDesignatedShipment }) =>
          type !== 'GIFT' && requireDesignatedShipment,
      ),
    [lineItems],
  ),
});
