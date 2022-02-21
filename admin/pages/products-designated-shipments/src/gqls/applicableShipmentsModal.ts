// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
export const applicableShipmentsModalProductFragment = gql`
  fragment applicableShipmentsModalProductFragment on Product {
    id
    title {
      ...localeFragment
    }
  }

  ${localeFragment}
`;

export const applicableShipmentsModalStoreShipmentFragment = gql`
  fragment applicableShipmentsModalStoreShipmentFragment on StoreShipment {
    id
    title {
      ...localeFragment
    }
  }

  ${localeFragment}
`;
