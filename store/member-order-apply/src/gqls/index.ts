// import
import gql from 'graphql-tag';

// graphql import
import { productsObjectTypeOrderApplyFragment } from '@store/apollo/lib/gqls/productsObjectType';
import {
  applyForReturnOrExchangeWithOrderOrderFragment,
  applyForReturnOrExchangeWithOrderOrderApplyFragment,
} from '@store/apollo/lib/gqls/applyForReturnOrExchangeWithOrder';

import { useColumnsOrderMemberOrderApplyFragment } from './useColumns';
import { recipientFragment } from './recipient';

// definition
export const getMemberOrderApply = gql`
  query getMemberOrderApply($orderId: ID!) {
    viewer {
      id
      order(orderId: $orderId) {
        id
        orderNo
        createdAt
        ...useColumnsOrderMemberOrderApplyFragment
        ...recipientFragment
        ...applyForReturnOrExchangeWithOrderOrderFragment
      }
    }

    # TODO: use new api
    getOrderApplyList(
      search: { sort: [{ field: "createdAt", order: "desc" }] }
    ) {
      data {
        ...applyForReturnOrExchangeWithOrderOrderApplyFragment
        ...productsObjectTypeOrderApplyFragment
      }
    }
  }

  ${applyForReturnOrExchangeWithOrderOrderFragment}
  ${applyForReturnOrExchangeWithOrderOrderApplyFragment}
  ${productsObjectTypeOrderApplyFragment}
  ${useColumnsOrderMemberOrderApplyFragment}
  ${recipientFragment}
`;
