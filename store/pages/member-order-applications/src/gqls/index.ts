// import
import { gql } from '@apollo/client';

// graphql import
import {
  orderOrderFragment,
  orderOrderApplyFragment,
} from '@store/apollo/lib/gqls/order';

import { applicationOrderApplyFragment } from './application';
import { useColumnsProductsObjectTypeFragment } from './useColumns';

// graphql import
import { applicationFragment } from './application';

// definition
export const getMemberOrderApplications = gql`
  query getMemberOrderApplications($orderId: ID!) {
    viewer {
      id
      order(orderId: $orderId) {
        id
        orderNo
        createdAt
        products {
          id
          ...useColumnsProductsObjectTypeFragment
        }
        ...applicationFragment
        ...orderOrderFragment
      }
    }

    # TODO: use new api
    getOrderApplyList(
      search: { sort: [{ field: "createdAt", order: "desc" }] }
    ) {
      data {
        id
        ...applicationOrderApplyFragment
        ...orderOrderApplyFragment
      }
    }
  }

  ${orderOrderFragment}
  ${orderOrderApplyFragment}
  ${applicationFragment}
  ${applicationOrderApplyFragment}
  ${useColumnsProductsObjectTypeFragment}
`;
