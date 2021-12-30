// import
import { gql } from '@apollo/client';

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
        auditLogs {
          ...recordFragment
        }
      }
    }
  }

  ${recordFragment}
`;
