// import
import { gql } from '@apollo/client';

// definition
export const startOpenAPIFeatureSubscription = gql`
  mutation startOpenAPIFeatureSubscription($isRenew: Boolean!) {
    startOpenAPIFeatureSubscription @skip(if: $isRenew) {
      ... on OpenAPIFeatureSubscription {
        apiKey
      }
    }

    renewOpenAPIFeatureSubscription @include(if: $isRenew) {
      ... on OpenAPIFeatureSubscription {
        apiKey
      }
    }
  }
`;

export const useStartOpenApiFeatureSubscriptionFragment = gql`
  fragment useStartOpenApiFeatureSubscriptionFragment on Store {
    id
    featureSubscription {
      openAPIFeatureSubscription {
        status
        apiKey
      }
    }
  }
`;
