// import
import { gql } from '@apollo/client';

// definition
export const envelopeFragment = gql`
  fragment envelopeFragment on User {
    id
    store {
      id
      description {
        name
      }
      setting {
        senderInfo {
          name
          phoneNumber
          streetAddress
        }
      }
    }
    order(orderId: $orderId) {
      id
      orderNo
      address {
        fullAddress
      }
      shipmentInfo {
        list {
          id
          template
          recipient {
            name
            mobile
          }
        }
      }
    }
  }
`;
