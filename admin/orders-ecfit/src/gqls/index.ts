// import
import gql from 'graphql-tag';

// graphql import
import { changeStatusOrderConnectionFragment } from '@admin/orders/lib/gqls/changeStatus';
import {
  OrdersOrderConnectionFragment,
  OrdersStoreFragment,
} from '@admin/orders/lib/gqls/index';
import { useEcfitColumnsFragment } from './useEcfitColumns';

// definition
export const getEcfitList = gql`
  query getEcfitList(
    $first: PositiveInt!
    $cursor: String
    $filter: EcfitOrderFilterInput
  ) {
    viewer {
      id

      orders: ecfitOrders(first: $first, after: $cursor, filter: $filter) {
        ...OrdersOrderConnectionFragment
        ...useEcfitColumnsFragment
      }

      sentFailedList: ecfitOrders(
        first: 10
        filter: { ecfitSentStatus: SENT_FAILED }
      ) {
        total
      }

      store {
        id
        ...OrdersStoreFragment
      }
    }

    selectedOrders @client {
      ...changeStatusOrderConnectionFragment
      ...useEcfitColumnsFragment
    }
  }

  ${changeStatusOrderConnectionFragment}
  ${OrdersOrderConnectionFragment}
  ${OrdersStoreFragment}
  ${useEcfitColumnsFragment}
`;
