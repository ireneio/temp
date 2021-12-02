// import
import { gql } from '@apollo/client';

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
