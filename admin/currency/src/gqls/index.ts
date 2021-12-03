// import
import { gql } from '@apollo/client';

// definition
export const getAdminCurrency = gql`
  query getAdminCurrency {
    viewer {
      id
      store {
        id
        currency
      }
    }
  }
`;
