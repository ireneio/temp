// import
import { gql } from '@apollo/client';

// definition
export const storeShipmentDetailFragment = gql`
  fragment storeShipmentDetailFragment on User {
    id
    order(orderId: $orderId) {
      id
      orderNo
      shipmentInfo {
        list {
          storeShipmentDetails {
            id
            accountInfo {
              allPay {
                logisticsSubType
              }
            }
          }
          ecpayC2c {
            ... on EcpayC2cFami {
              __typename
              type
              barCode1
              barCode2
              barCode3
              barCode4
              qrCode
              cvsPaymentNo
              allPayLogisticsID
              fee
              senderName
              receiverName
              cvsStoreName
            }
            ... on EcpayC2cUni {
              __typename
              type
              barCode1
              barCode2
              barCode3
              qrCode
              cvsPaymentNo
              fee
              dueDate
              companyName
              senderName
              receiverName
              cvsStoreName
            }
            ... on EcpayC2cHilife {
              __typename
              type
              barCode1
              barCode2
              barCode3
              barCode3
              ecpayId
              cvsPaymentNo
              shipmentNo
              dueDate
              senderName
              receiverName
              cvsStoreName
            }
          }
        }
      }
    }
  }
`;
