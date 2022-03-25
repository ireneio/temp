// import
import { gql } from '@apollo/client';

// definition
export const startOpenApiFeatureSubscription = gql`
  mutation startOpenApiFeatureSubscription($isRenew: Boolean!) {
    startOpenApiFeatureSubscription @skip(if: $isRenew) {
      ... on OpenApiFeatureSubscription {
        apiKey
      }
    }

    renewOpenApiFeatureSubscription @include(if: $isRenew) {
      ... on OpenApiFeatureSubscription {
        apiKey
      }
    }
  }
`;

export const useStartOpenApiFeatureSubscriptionFragment = gql`
  fragment useStartOpenApiFeatureSubscriptionFragment on Store {
    id
    featureSubscription {
      openApiFeatureSubscription {
        status
        apiKey
      }
    }
  }
`;
