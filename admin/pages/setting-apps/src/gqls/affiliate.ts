// import
import { gql } from '@apollo/client';

// definition
export const affiliateFragment = gql`
  fragment affiliateFragment on Store {
    id
    featureSubscription {
      affiliateFeatureSubscription {
        status
      }
    }
  }
`;
