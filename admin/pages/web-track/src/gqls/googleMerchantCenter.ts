// import
import { gql } from '@apollo/client';

// definition
export const googleMerchantCenterFragment = gql`
  fragment googleMerchantCenterFragment on Store {
    id
    adTracks {
      googleMerchantCenterVerificationCode
    }
  }
`;
