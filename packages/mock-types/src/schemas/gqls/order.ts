// import
import gql from 'graphql-tag';

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
