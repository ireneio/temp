// import
import { gql } from '@apollo/client';

// definition
export const useInitialValuesInCheckoutFragment = gql`
  fragment useInitialValuesInCheckoutFragment on User {
    id
    name
    mobile
    address {
      country {
        id
      }
      city {
        id
      }
      area {
        id
      }
      street
      zipCode
    }
  }
`;
