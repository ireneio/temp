// import
import { gql } from '@apollo/client';

// definition
export const startAffiliateFeatureSubscription = gql`
  mutation startAffiliateFeatureSubscription($isRenew: Boolean!) {
    startAffiliateFeatureSubscription @skip(if: $isRenew) {
      ... on OkResponse {
        message
      }
    }

    renewAffiliateFeatureSubscription @include(if: $isRenew) {
      ... on OkResponse {
        message
      }
    }
  }
`;

export const useStartAffiliateFeatureSubscriptionFragment = gql`
  fragment useStartAffiliateFeatureSubscriptionFragment on Store {
    id
    featureSubscription {
      affiliateFeatureSubscription {
        status
      }
    }
  }
`;
