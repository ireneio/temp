// import
import { gql } from '@apollo/client';

// graphql import
import {
  OrdersOrderConnectionFragment,
  OrdersStoreFragment,
} from '@admin/orders/lib/gqls/index';

import { useEcpayColumnsFragment } from './useEcpayColumns';

// definition
export const getEcpayList = gql`
  query getEcpayList(
    $first: PositiveInt
    $cursor: String
    $filter: OrderFilterInput
  ) {
    viewer {
      id

      orders(first: $first, after: $cursor, filter: $filter) {
        ...OrdersOrderConnectionFragment
        ...useEcpayColumnsFragment
      }

      store {
        id
        ...OrdersStoreFragment
      }
    }
  }

  ${OrdersOrderConnectionFragment}
  ${OrdersStoreFragment}
  ${useEcpayColumnsFragment}
`;
