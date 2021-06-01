// import
import gql from 'graphql-tag';

// graphql import
import {
  createOrderApplyWithOrderOrderApplyFragment,
  createOrderApplyWithOrderOrderClientFragment,
} from '@store/apollo/lib/gqls/createOrderApplyWithOrder';

// definition
export const createOrderApply = gql`
  mutation createOrderApply(
    $createOrderApplyList: [NewOrderApply]
    $orderId: ID!
  ) {
    createOrderApplyList(createOrderApplyList: $createOrderApplyList) {
      id
      ...createOrderApplyWithOrderOrderApplyFragment
    }

    createOrderApplyWithOrder(orderId: $orderId) @client {
      id
      ...createOrderApplyWithOrderOrderClientFragment
    }
  }

  ${createOrderApplyWithOrderOrderApplyFragment}
  ${createOrderApplyWithOrderOrderClientFragment}
`;
