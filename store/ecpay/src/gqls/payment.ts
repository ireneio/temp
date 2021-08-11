// import
import gql from 'graphql-tag';

// definition
export const paymentFragment = gql`
  fragment paymentFragment on User {
    id
    order(orderId: $orderId) {
      id
      priceInfo {
        total
      }
      paymentInfo {
        list {
          template
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
