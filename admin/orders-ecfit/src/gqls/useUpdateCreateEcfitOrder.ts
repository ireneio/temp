// import
import gql from 'graphql-tag';

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

export const useUpdateCreateEcfitOrdersOrderConnectionFragment = gql`
  fragment useUpdateCreateEcfitOrdersOrderConnectionFragment on OrderConnection {
    edges {
      node {
        id
      }
    }
  }
`;

export const useUpdateCreateEciftOrderFragment = gql`
  fragment useUpdateCreateEciftOrderFragment on User {
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
