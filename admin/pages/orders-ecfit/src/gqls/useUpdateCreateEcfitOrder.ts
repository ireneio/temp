// import
import { gql } from '@apollo/client';

// definition
export const createEcfitOrder = gql`
  mutation createEcfitOrder($input: CreateEcfitOrderInput!) {
    createEcfitOrder(input: $input) {
      status
    }
  }
`;

export const useUpdateCreateEcfitOrdersStoreFragment = gql`
  fragment useUpdateCreateEcfitOrdersStoreFragment on Store {
    id
    storeEcfitSettings {
      isEnabled
    }
  }
`;

export const useUpdateCreateEciftOrderUserFragment = gql`
  fragment useUpdateCreateEciftOrderUserFragment on User {
    id
    orders: ecfitOrders(first: $first, after: $cursor, filter: $filter) {
      edges {
        node {
          id
        }
      }
      pageInfo {
        endCursor
      }
    }

    store {
      id
      ...useUpdateCreateEcfitOrdersStoreFragment
    }
  }

  ${useUpdateCreateEcfitOrdersStoreFragment}
`;
