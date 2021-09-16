// import
import gql from 'graphql-tag';

// definition
export const useShipmentsLandingPageModuleFragment = gql`
  fragment useShipmentsLandingPageModuleFragment on LandingPageModule {
    id
    storeShipments {
      id
    }
  }
`;

export const useShipmentsOrderFragment = gql`
  fragment useShipmentsOrderFragment on Order {
    id
    categories {
      shipmentList: shipmentTemplates {
        name
        shipmentId
        template
        description
        storeShipmentDetails {
          accountInfo {
            allpay: allPay {
              # for Convenience Store Map
              # TODO rename
              logisticsSubType
            }
          }
        }
      }
    }
  }
`;
