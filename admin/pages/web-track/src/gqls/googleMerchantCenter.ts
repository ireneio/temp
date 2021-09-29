// import
import gql from 'graphql-tag';

// definition
export const googleMerchantCenterFragment = gql`
  fragment googleMerchantCenterFragment on Store {
    id
    adTracks {
      googleMerchantCenterVerificationCode
    }
  }
`;
