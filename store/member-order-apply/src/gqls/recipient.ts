// import
import gql from 'graphql-tag';

// definition
export const recipientFragment = gql`
  fragment recipientFragment on Order {
    id
    shipmentInfo {
      list {
        id
        recipient {
          name
          mobile
        }
      }
    }
    address {
      fullAddress
    }
  }
`;
