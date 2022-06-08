// import
import { gql } from '@apollo/client';

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
  }

  ${useColumnsOrdersFragment}
`;
