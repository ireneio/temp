// import
import { gql } from '@apollo/client';

// graphql import
import {
  OrdersOrderConnectionFragment,
  OrdersStoreFragment,
} from '@admin/orders/lib/gqls';

import { useEcfitColumnsFragment } from './useEcfitColumns';
import { useUpdateCreateEcfitOrdersStoreFragment } from './useUpdateCreateEcfitOrder';

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
        ...useUpdateCreateEcfitOrdersStoreFragment
      }
    }
  }

  ${OrdersOrderConnectionFragment}
  ${OrdersStoreFragment}
  ${useEcfitColumnsFragment}
  ${useUpdateCreateEcfitOrdersStoreFragment}
`;
