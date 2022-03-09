// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

import {
  useSetProductDesignatedShipmentFragment,
  useSetProductDesignatedShipmentStoreShipmentFragment,
} from './useSetProductDesignatedShipment';

// definition
export const applicableShipmentsModalProductFragment = gql`
  fragment applicableShipmentsModalProductFragment on Product {
    id
    title {
      ...localeFragment
    }
    applicableShipments {
      id
    }
    requireDesignatedShipment
  }

  ${localeFragment}
`;

export const applicableShipmentsModalStoreShipmentFragment = gql`
  fragment applicableShipmentsModalStoreShipmentFragment on StoreShipment {
    id
    title {
      ...localeFragment
    }

    ...useSetProductDesignatedShipmentStoreShipmentFragment
  }

  ${localeFragment}
  ${useSetProductDesignatedShipmentStoreShipmentFragment}
`;

export const applicableShipmentsModalAdminProductsConnectionFragment = gql`
  fragment applicableShipmentsModalAdminProductsConnectionFragment on AdminProductsConnection {
    ...useSetProductDesignatedShipmentFragment
  }

  ${useSetProductDesignatedShipmentFragment}
`;
