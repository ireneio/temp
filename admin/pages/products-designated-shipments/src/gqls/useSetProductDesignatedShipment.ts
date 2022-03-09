// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

import { useColumnsProductFragment } from './useColumns';

// definition
export const setProductDesignatedShipment = gql`
  mutation setProductDesignatedShipment(
    $input: SetProductDesignatedShipmentInput!
  ) {
    setProductDesignatedShipment(input: $input) {
      ... on OkResponse {
        message
      }
      ... on UnauthorizedError {
        message
      }
      ... on UnhandledError {
        message
      }
    }
  }
`;

export const useSetProductDesignatedShipmentStoreShipmentFragment = gql`
  fragment useSetProductDesignatedShipmentStoreShipmentFragment on StoreShipment {
    id
    title {
      ...localeFragment
    }
    status
  }

  ${localeFragment}
`;

export const useSetProductDesignatedShipmentFragment = gql`
  fragment useSetProductDesignatedShipmentFragment on AdminProductsConnection {
    __typename
    edges {
      __typename
      cursor
      node {
        __typename
        id
        title {
          __typename
        }
        variants {
          __typename
        }
        applicableShipments {
          __typename
          title {
            __typename
          }
        }
        ...useColumnsProductFragment
      }
    }
  }

  ${useColumnsProductFragment}
`;
