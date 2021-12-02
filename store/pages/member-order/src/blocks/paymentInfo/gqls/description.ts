// import
import { gql } from '@apollo/client';

// definition
export const descriptionFragment = gql`
  fragment descriptionFragment on Order {
    id
    paidMessage {
      note
    }
    paymentInfo {
      id
      list {
        id
        description
      }
    }
  }
`;
