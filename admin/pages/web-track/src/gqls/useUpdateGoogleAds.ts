// import
import { gql } from '@apollo/client';

// definition
export const useUpdateGoogleAdsFragment = gql`
  fragment useUpdateGoogleAdsFragment on Store {
    id
    adTracks {
      googleAdwordsConfig
      googleAdwordsSignUp
      googleAdwordsBeginCheckout
      googleAdwordsPurchase
    }
  }
`;
