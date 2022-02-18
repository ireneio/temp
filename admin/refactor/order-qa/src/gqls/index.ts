// import
import { gql } from '@apollo/client';

// definition
export const getOrderReplied = gql`
  query getOrderReplied($orderId: ID!) {
    viewer {
      id
      order(orderId: $orderId) {
        id
        messageReplied
      }
    }
  }
`;
