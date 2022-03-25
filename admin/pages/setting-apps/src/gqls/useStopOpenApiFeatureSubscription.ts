// import
import { gql } from '@apollo/client';

// definition
export const stopOpenApiFeatureSubscription = gql`
  mutation stopOpenApiFeatureSubscription {
    stopOpenApiFeatureSubscription {
      ... on OkResponse {
        message
      }
    }
  }
`;

export const useStopOpenApiFeatureSubscriptionFragment = gql`
  fragment useStopOpenApiFeatureSubscriptionFragment on Store {
    id
    featureSubscription {
      openApiFeatureSubscription {
        status
        apiKey
      }
    }
  }
`;
