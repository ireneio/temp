// import
import { gql } from '@apollo/client';

// definition
export const useSetGoogleMerchantCenterVerificationCodeFragment = gql`
  fragment useSetGoogleMerchantCenterVerificationCodeFragment on Store {
    id
    adTracks {
      googleMerchantCenterVerificationCode
    }
  }
`;

export const setGoogleMerchantCenterVerificationCode = gql`
  mutation setGoogleMerchantCenterVerificationCode(
    $input: SetGoogleMerchantCenterVerificationCodeInput!
  ) {
    setGoogleMerchantCenterVerificationCode(input: $input) {
      ... on OkResponse {
        message
      }
    }
  }
`;
