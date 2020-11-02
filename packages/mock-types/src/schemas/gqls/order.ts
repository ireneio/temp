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
  }
`;
