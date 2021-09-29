// import
import gql from 'graphql-tag';

// definition
export const usePayOrderAgainFragment = gql`
  fragment usePayOrderAgainFragment on Order {
    id
    paymentInfo {
      list {
        paymentId
      }
    }
  }
`;
