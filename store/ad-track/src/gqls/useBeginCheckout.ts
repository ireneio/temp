// import
import gql from 'graphql-tag';

// definition
export const useBeginCheckoutFragment = gql`
  fragment useBeginCheckoutFragment on AdTracks {
    facebookPixelId
    googleAnalyticsId
    googleAdwordsConfig
    googleAdwordsBeginCheckout
  }
`;
