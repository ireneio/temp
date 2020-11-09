// import
import gql from 'graphql-tag';

// definition
export const usePurchaseFragment = gql`
  fragment usePurchaseFragment on Store {
    id
    cname
    adTracks {
      facebookPixelId
      googleAnalyticsId
      googleAdwordsConfig
      googleAdwordsPurchase
    }
  }
`;