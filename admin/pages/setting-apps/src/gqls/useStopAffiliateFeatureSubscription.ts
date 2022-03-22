// import
import { gql } from '@apollo/client';

// definition
export const stopAffiliateFeatureSubscription = gql`
  mutation stopAffiliateFeatureSubscription {
    stopAffiliateFeatureSubscription {
      ... on OkResponse {
        message
      }
    }
  }
`;

export const useStopAffiliateFeatureSubscriptionFragment = gql`
  fragment useStopAffiliateFeatureSubscriptionFragment on Store {
    id
    featureSubscription {
      affiliateFeatureSubscription {
        status
      }
    }
  }
`;
