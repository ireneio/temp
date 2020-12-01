// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import { useMemo } from 'react';

// graphql typescript
import { useShipmentsLandingPageModuleFragment_storeShipments as useShipmentsLandingPageModuleFragmentStoreShipments } from '../gqls/__generated__/useShipmentsLandingPageModuleFragment';
import {
  useShipmentsOrderFragment_categories as useShipmentsOrderFragmentCategories,
  useShipmentsOrderFragment_categories_shipmentList as ShipmentType,
} from '../gqls/__generated__/useShipmentsOrderFragment';

// definition
export default (
  shipmentTemplates: useShipmentsOrderFragmentCategories['shipmentList'],
  storeShipments: useShipmentsLandingPageModuleFragmentStoreShipments[],
  form: FormComponentProps['form'],
): [ShipmentType | null, ShipmentType[]] => {
  const { getFieldValue } = form;

  const shipments = useMemo(() => {
    if (!shipmentTemplates) return [];

    return storeShipments
      .map(storeShipment =>
        shipmentTemplates.find(
          shipment => shipment?.shipmentId === storeShipment.id,
        ),
      )
      .filter(Boolean) as ShipmentType[];
  }, [shipmentTemplates, storeShipments]);

  return [
    useMemo(
      () =>
        shipments.find(
          shipment => shipment.shipmentId === getFieldValue('shipmentId'),
        ) || null,
      [shipments, getFieldValue],
    ),
    shipments,
  ];
};
