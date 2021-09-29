// import
import gql from 'graphql-tag';

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
