// import
import { gql } from '@apollo/client';

// definition
export const useConvenienceStoreFragment = gql`
  fragment useConvenienceStoreFragment on shipmentObjectType {
    id
    shipmentId
    template
  }
`;

export const getEcpayShipmentInfo = gql`
  query getEcpayShipmentInfo($storeShipmentId: ID!) {
    viewer {
      id
      store {
        id
        storeShipment(storeShipmentId: $storeShipmentId) {
          id
          accountInfo {
            allpay: allPay {
              # TODO rename
              logisticsSubType
            }
          }
        }
      }
    }
  }
`;
