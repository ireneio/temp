// import
import gql from 'graphql-tag';

// graphql import
import {
  createOrderApplyWithOrderOrderClientFragment,
  createOrderApplyWithOrderOrderApplyFragment,
} from '@store/apollo/lib/createOrderApplyWithOrder';

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
