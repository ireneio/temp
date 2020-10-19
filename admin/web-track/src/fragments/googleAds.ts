// import
import gql from 'graphql-tag';

// definition
export const updateGoogleAdsCacheFragment = gql`
  fragment updateGoogleAdsCacheFragment on Store {
    id
    adTrack @client {
      googleAdwordsConfig
      googleAdwordsSignUp
      googleAdwordsBeginCheckout
      googleAdwordsPurchase
    }
  }
`;

export const googleAdsFragment = gql`
  fragment googleAdsFragment on Store {
    id
    setting {
      googleFeedsLink
    }
    ...updateGoogleAdsCacheFragment
  }

  ${updateGoogleAdsCacheFragment}
`;
