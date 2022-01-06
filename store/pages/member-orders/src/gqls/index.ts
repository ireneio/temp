// import
import { gql } from '@apollo/client';

// graphql import
import { orderOrderApplyFragment } from '@store/apollo/lib/gqls/order';

import { useColumnsOrdersFragment } from './useColumns';

// definition
export const getOrders = gql`
  query getOrders($first: PositiveInt!, $cursor: String) {
    viewer {
      id
      orders(first: $first, after: $cursor) @connection(key: "orders") {
        edges {
          ...useColumnsOrdersFragment
        }

        pageInfo {
          endCursor
          currentInfo(input: { pageId: "member-orders" }) @client {
            id
            current
          }
        }

        total
      }
    }

    getOrderApplyList(
      search: { sort: [{ field: "createdAt", order: "desc" }] }
    ) {
      data {
        ...orderOrderApplyFragment
      }
    }
  }

  ${useColumnsOrdersFragment}
  ${orderOrderApplyFragment}
`;
