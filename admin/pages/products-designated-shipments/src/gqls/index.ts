// import
import { gql } from '@apollo/client';

// graphql import
import { applicableShipmentsModalStoreShipmentFragment } from './applicableShipmentsModal';

// definition
export const getStoreShipments = gql`
  query getStoreShipments {
    viewer {
      id
      store {
        id
        storeShipments {
          ...applicableShipmentsModalStoreShipmentFragment
        }
      }
    }
  }

  ${applicableShipmentsModalStoreShipmentFragment}
`;
