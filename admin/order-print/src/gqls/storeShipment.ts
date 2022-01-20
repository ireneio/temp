// import
import { gql } from '@apollo/client';

// graphql import
import { storeShipmentDetailFragment } from './storeShipmentDetail';

// definition
export const storeShipmentUserFragment = gql`
  fragment storeShipmentUserFragment on User {
    id
    ...storeShipmentDetailFragment
  }

  ${storeShipmentDetailFragment}
`;

export const storeShipmentUniMartC2CRedirectInfoFragment = gql`
  fragment storeShipmentUniMartC2CRedirectInfoFragment on UniMartC2CRedirectInfo {
    requestOption {
      MerchantID
      AllPayLogisticsID
      CVSPaymentNo
      CVSValidationNo
      CheckMacValue
    }
    requestUrl
  }
`;
