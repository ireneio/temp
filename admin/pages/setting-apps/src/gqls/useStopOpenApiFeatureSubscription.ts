// import
import { gql } from '@apollo/client';

// definition
export const stopOpenAPIFeatureSubscription = gql`
  mutation stopOpenAPIFeatureSubscription {
    stopOpenAPIFeatureSubscription {
      ... on OkResponse {
        message
      }
    }
  }
`;

export const useStopOpenAPIFeatureSubscriptionFragment = gql`
  fragment useStopOpenAPIFeatureSubscriptionFragment on Store {
    id
    featureSubscription {
      openAPIFeatureSubscription {
        status
        apiKey
      }
    }
  }
`;
