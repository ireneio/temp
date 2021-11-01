// import
import gql from 'graphql-tag';

// definition
export const ecpayCreditFragment = gql`
  fragment ecpayCreditFragment on User {
    id
    store {
      id
      description {
        name
      }
    }
    order(orderId: $orderId) {
      id
      orderNo
      priceInfo {
        total
      }
      paymentInfo {
        id
        status
        list {
          accountInfo {
            ecpay2 {
              ChoosePayment
            }
          }
        }
      }
    }
  }
`;
