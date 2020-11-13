// import
import gql from 'graphql-tag';

// graphql import
import {
  advancedSearchStorePaymentFragment,
  advancedSearchStoreShipmentFragment,
} from '../AdvancedSearch';
import { changeStatusOrderConnectionFragment } from '../ChangeStatus';
import { tagsStorePaymentFragment, tagsStoreShipmentFragment } from '../Tags';
import { useColumnsFragment } from './useColumns';

// definition
export const setOrdersToSelectedOrders = gql`
  mutation setOrdersToSelectedOrders($input: SetOrdersToSelectedOrdersInput!) {
    setOrdersToSelectedOrders(input: $input) @client
  }
`;

export const getEcfitList = gql`
  query getEcfitList(
    $first: PositiveInt!
    $cursor: String
    $filter: EcfitOrderFilterInput
  ) {
    viewer {
      id
      ecfitOrders(first: $first, after: $cursor, filter: $filter) {
        ...useColumnsFragment
        edges {
          node {
            id
          }
        }
        pageInfo {
          endCursor
          currentInfo(input: { pageId: "orders-ecfit" }) @client {
            id
            current
          }
        }
      }
      sentFailedList: ecfitOrders(
        first: 10
        filter: { ecfitSentStatus: SENT_FAILED }
      ) {
        total
      }
      store {
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
    }
    selectedOrders @client {
      ...changeStatusOrderConnectionFragment
      ...useColumnsFragment
      edges {
        node {
          id
        }
      }
      total
    }
  }
  ${advancedSearchStorePaymentFragment}
  ${advancedSearchStoreShipmentFragment}
  ${changeStatusOrderConnectionFragment}
  ${tagsStorePaymentFragment}
  ${tagsStoreShipmentFragment}
  ${useColumnsFragment}
`;
