// import
import { gql } from '@apollo/client';

// definition
export const googleAdsFragment = gql`
  fragment googleAdsFragment on Store {
    id
    setting {
      googleFeedsLink
    }
    adTracks {
      googleAdwordsConfig
      googleAdwordsSignUp
      googleAdwordsBeginCheckout
      googleAdwordsPurchase
    }
  }
`;
