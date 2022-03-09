// import
import { gql } from '@apollo/client';

// graphql import
import { applicableShipmentsModalStoreShipmentFragment } from './applicableShipmentsModal';
import { filterProductTagFragment } from './filterProductTag';
import { filterShipmentFragment } from './filterShipment';

// definition
export const getStoreShipments = gql`
  query getStoreShipments($search: searchInputObjectType) {
    viewer {
      id
      store {
        id
        storeShipments {
          id
          ...applicableShipmentsModalStoreShipmentFragment
          ...filterShipmentFragment
        }
      }
    }

    getTagList(search: $search)
      @connection(key: "getTagList", filter: ["filter"]) {
      data {
        id
        ...filterProductTagFragment
      }
    }
  }

  ${applicableShipmentsModalStoreShipmentFragment}
  ${filterProductTagFragment}
  ${filterShipmentFragment}
`;
