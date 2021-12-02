// import
import { gql } from '@apollo/client';

// definition
export const useBeginCheckoutFragment = gql`
  fragment useBeginCheckoutFragment on AdTracks {
    googleAnalyticsId
    googleAdwordsConfig
    googleAdwordsBeginCheckout
  }
`;
