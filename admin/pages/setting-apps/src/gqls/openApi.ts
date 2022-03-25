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
        # FIXME: remove client side schema after api is ready
        openApiFeatureSubscription @client {
          status
          apiKey
        }
      }
    }
  }
`;
