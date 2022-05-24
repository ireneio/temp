// import
import { gql } from '@apollo/client';

// definition
export const openApiFragment = gql`
  fragment openApiFragment on User {
    id
    role
    store {
      id
      featureSubscription {
        openAPIFeatureSubscription {
          status
          apiKey
        }
      }
    }
  }
`;
