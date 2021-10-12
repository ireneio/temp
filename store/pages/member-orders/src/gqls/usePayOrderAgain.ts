// import
import gql from 'graphql-tag';

// graphql import
import { createOrderFragment } from '@meepshop/utils/lib/gqls/createOrder';

// definition
export const usePayOrderAgainFragment = gql`
  fragment usePayOrderAgainFragment on Order {
    id
    paymentInfo {
      list {
        paymentId
      }
    }
  }
`;

export const payOrderAgain = gql`
  mutation payOrderAgain($paymentAgainOrderList: [PaymentAgainOrder]) {
    paymentAgainOrderList(paymentAgainOrderList: $paymentAgainOrderList) {
      id
      ...createOrderFragment
    }
  }

  ${createOrderFragment}
`;
