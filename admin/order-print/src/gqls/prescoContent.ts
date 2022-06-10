// import
import { gql } from '@apollo/client';

// definition
export const prescoContentFragment = gql`
  fragment prescoContentFragment on User {
    id
    store {
      id
      domain
      defaultDomain
      description {
        name
      }
      setting {
        senderInfo {
          phoneNumber
        }
      }
    }
    order(orderId: $orderId) {
      id
      orderNo
      createdAt
      presco {
        shipmentNumber
      }
      shipmentInfo {
        list {
          storeShipmentDetails {
            accountInfo {
              presco {
                isCollection
                parentId
                eshopId
              }
            }
          }
          recipient {
            name
            receiverStoreName
            receiverStoreID
            cvsNameForPrescoLabel
          }
        }
      }
    }
  }
`;
