// import
import { gql } from '@apollo/client';

// definition
export const paymentFragment = gql`
  fragment paymentFragment on User {
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
