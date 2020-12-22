// import
import gql from 'graphql-tag';

// graphql import
import { recordFragment } from './record';

// definition
export const getOrderHistoryRecords = gql`
  query getOrderHistoryRecords($orderId: ID!) {
    viewer {
      id
      order(orderId: $orderId) {
        id
        orderNo
        createdAt
        orderHistoryRecords {
          ...recordFragment
        }
      }
    }
  }

  ${recordFragment}
`;
