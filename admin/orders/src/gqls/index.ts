// import
import { gql } from '@apollo/client';

// graphql import
import {
  advancedSearchStorePaymentFragment,
  advancedSearchStoreShipmentFragment,
} from '../advancedSearch/gqls';
import { tagsStorePaymentFragment, tagsStoreShipmentFragment } from './tags';
import { useOrdersColumnsFragment } from './useOrdersColumns';

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
    storePayments {
      ...advancedSearchStorePaymentFragment
      ...tagsStorePaymentFragment
    }
    storeShipments {
      ...advancedSearchStoreShipmentFragment
      ...tagsStoreShipmentFragment
    }
    storeEcfitSettings {
      isEnabled
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
        ...useOrdersColumnsFragment
      }

      store {
        id
        ...OrdersStoreFragment
      }
    }
  }

  ${OrdersOrderConnectionFragment}
  ${OrdersStoreFragment}
  ${useOrdersColumnsFragment}
`;
