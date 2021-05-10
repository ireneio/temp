// import
import gql from 'graphql-tag';

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
