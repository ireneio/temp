// import
import gql from 'graphql-tag';

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
