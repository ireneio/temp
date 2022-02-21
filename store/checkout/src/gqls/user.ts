// import
import { gql } from '@apollo/client';

// definition
export const userFragment = gql`
  fragment userFragment on Store {
    id
    shippableCountries {
      id
    }
    setting {
      checkoutFields {
        name
        mobile
        address
      }
    }
  }
`;
