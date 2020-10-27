// import
import gql from 'graphql-tag';

// graphql import
import { orderOrderApplyFragment } from '@store/apollo/lib/Order';

import useColumnsOrdersFragment from './useColumns';

// definition
export default gql`
  query getOrders($first: PositiveInt!, $cursor: String) {
    viewer {
      id
      orders(first: $first, after: $cursor) {
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
