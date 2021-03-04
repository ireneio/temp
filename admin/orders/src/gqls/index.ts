// import
import gql from 'graphql-tag';

// graphql import
import {
  advancedSearchStorePaymentFragment,
  advancedSearchStoreShipmentFragment,
} from '../advancedSearch/gqls';
import { changeStatusOrderConnectionFragment } from './changeStatus';
import { tagsStorePaymentFragment, tagsStoreShipmentFragment } from './tags';

// definition
export const OrdersOrderConnectionFragment = gql`
  fragment OrdersOrderConnectionFragment on OrderConnection {
    edges {
      node {
        id
      }
    }

    total

    pageInfo {
      endCursor
      currentInfo @client {
        id
        current
      }
    }
  }
`;

export const OrdersStoreFragment = gql`
  fragment OrdersStoreFragment on Store {
    id
    storeEcfitSettings {
      isEnabled
    }
    storePayments {
      ...advancedSearchStorePaymentFragment
      ...tagsStorePaymentFragment
    }
    storeShipments {
      ...advancedSearchStoreShipmentFragment
      ...tagsStoreShipmentFragment
    }
  }

  ${advancedSearchStorePaymentFragment}
  ${advancedSearchStoreShipmentFragment}
  ${tagsStorePaymentFragment}
  ${tagsStoreShipmentFragment}
`;

export const getOrders = gql`
  query getOrders(
    $first: PositiveInt!
    $cursor: String
    $filter: OrderFilterInput
  ) {
    viewer {
      id
      orders(first: $first, after: $cursor, filter: $filter) {
        ...OrdersOrderConnectionFragment
      }

      store {
        id
        ...OrdersStoreFragment
      }
    }

    selectedOrders @client {
      ...changeStatusOrderConnectionFragment
    }
  }

  ${changeStatusOrderConnectionFragment}
  ${OrdersOrderConnectionFragment}
  ${OrdersStoreFragment}
`;

export const setOrdersToSelectedOrders = gql`
  mutation setOrdersToSelectedOrders($input: SetOrdersToSelectedOrdersInput!) {
    setOrdersToSelectedOrders(input: $input) @client
  }
`;
