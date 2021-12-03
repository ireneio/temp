// import
import { gql } from '@apollo/client';

// definition
export const orderMockFragment = gql`
  fragment orderMockFragment on Order {
    id
    orderNo
    status
    createdAt
    paidMessage {
      note
    }
    auditLogs {
      orderProductQuantityDelta {
        __typename
      }
      productsAmountDelta {
        __typename
      }
      adjustAmountDelta {
        __typename
      }
    }
  }
`;
