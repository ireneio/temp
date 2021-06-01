// import
import gql from 'graphql-tag';

// graphql import
import { productsObjectTypeOrderApplyFragment } from '@store/apollo/lib/gqls/productsObjectType';
import {
  createOrderApplyWithOrderOrderFragment,
  createOrderApplyWithOrderOrderApplyFragment,
} from '@store/apollo/lib/gqls/createOrderApplyWithOrder';

import { useColumnsOrderMemberOrderApplyFragment } from './useColumns';

// definition
export const getMemberOrderApply = gql`
  query getMemberOrderApply($orderId: ID!) {
    viewer {
      id
      order(orderId: $orderId) {
        id
        orderNo
        createdAt
        shipmentInfo {
          list {
            id
            recipient {
              name
              mobile
            }
          }
        }
        address {
          fullAddress
        }
        ...useColumnsOrderMemberOrderApplyFragment
        ...createOrderApplyWithOrderOrderFragment
      }
    }

    # TODO: use new api
    getOrderApplyList(
      search: { sort: [{ field: "createdAt", order: "desc" }] }
    ) {
      data {
        ...createOrderApplyWithOrderOrderApplyFragment
        ...productsObjectTypeOrderApplyFragment
      }
    }
  }

  ${createOrderApplyWithOrderOrderFragment}
  ${createOrderApplyWithOrderOrderApplyFragment}
  ${productsObjectTypeOrderApplyFragment}
  ${useColumnsOrderMemberOrderApplyFragment}
`;
