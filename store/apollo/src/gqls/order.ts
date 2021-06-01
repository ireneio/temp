// import
import gql from 'graphql-tag';

// definition
export const orderOrderFragment = gql`
  fragment orderOrderFragment on Order {
    id
    paymentInfo {
      list {
        id
        template
        accountInfo {
          allpay {
            choosePayment: ChoosePayment
          }
          ezpay {
            choosePayment: ezpayPaymentType
          }
          gmo {
            choosePayment: paymentType
          }
        }
      }
    }
    products {
      id
      quantity
      type
    }
  }
`;

export const orderOrderApplyFragment = gql`
  fragment orderOrderApplyFragment on OrderApply {
    id
    orderId
    returnId
    orderProductId
    status
    quantity
  }
`;
