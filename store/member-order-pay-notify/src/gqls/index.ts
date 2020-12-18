// import
import gql from 'graphql-tag';

// definition
export const getOrderPaidMessage = gql`
  query getOrderPaidMessage($orderId: ID!) {
    viewer {
      id
      store {
        id
        setting {
          paidMessage
        }
      }
      order(orderId: $orderId) {
        id
        orderNo
        paidMessage {
          note
        }
      }
    }
  }
`;

export const updateOrderPaidMessage = gql`
  mutation updateOrderPaidMessage($updateOrder: UpdateOrder) {
    updateOrder(updateOrder: $updateOrder) {
      id
      paidMessage {
        note
      }
    }
  }
`;
