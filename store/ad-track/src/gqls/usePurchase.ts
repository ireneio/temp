// import
import { gql } from '@apollo/client';

// definition
export const usePurchaseFragment = gql`
  fragment usePurchaseFragment on Store {
    id
    cname
    adTracks {
      googleAnalyticsId
      googleAdwordsConfig
      googleAdwordsPurchase
    }
  }
`;
