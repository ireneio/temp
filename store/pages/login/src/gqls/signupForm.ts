// import
import { gql } from '@apollo/client';

// definition
export const signupFormFragment = gql`
  fragment signupFormFragment on Store {
    id
    memberGroupPromoRules {
      id
    }
    shippableCountries {
      id
    }
  }
`;
