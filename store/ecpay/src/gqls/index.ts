// import
import gql from 'graphql-tag';

// graphql import
import { orderInfoFragment } from './orderInfo';
import { paymentFragment } from './payment';

// definition
export const getOrderInEcpay = gql`
  query getOrderInEcpay($orderId: ID!) {
    viewer {
      id
      store {
        id
        logoImage {
          id
          scaledSrc {
            h200
          }
        }
      }

      ...orderInfoFragment
      ...paymentFragment
    }
  }

  ${orderInfoFragment}
  ${paymentFragment}
`;
