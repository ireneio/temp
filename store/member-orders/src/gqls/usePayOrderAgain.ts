// import
import gql from 'graphql-tag';

// definition
export default gql`
  fragment usePayOrderAgainFragment on Order {
    id
    paymentInfo {
      list {
        paymentId
      }
    }
  }
`;
