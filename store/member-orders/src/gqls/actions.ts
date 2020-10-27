// import
import gql from 'graphql-tag';

// graphql import
import createOrderFragment from '@meepshop/utils/lib/fragments/createOrder';

// definition
export const payOrderAgain = gql`
  mutation payOrderAgain($paymentAgainOrderList: [PaymentAgainOrder]) {
    paymentAgainOrderList(paymentAgainOrderList: $paymentAgainOrderList) {
      id
      ...createOrderFragment
    }
  }

  ${createOrderFragment}
`;

export const actionsFragment = gql`
  fragment actionsFragment on Order {
    id
    status
    isAvailableForPayLater @client
    isAvailableForOrderApply @client
    isOrderApplied @client
    choosePayLaterWhenPlaced
    paymentInfo {
      status
      list {
        id
        template
        paymentId
      }
    }
    shipmentInfo {
      status
    }
  }
`;
