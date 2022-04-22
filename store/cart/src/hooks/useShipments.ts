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
): useShipmentsFragmentApplicableShipmentsType[] =>
  useMemo(
    () =>
      lineItems.reduce(
        (result, item) =>
          (item.applicableShipments || []).reduce(
            (shipments, shipment) =>
              shipments.find(({ id }) => id === shipment.id)
                ? shipments
                : [...shipments, shipment],
            result,
          ),
        [],
      ),
    [lineItems],
  );
