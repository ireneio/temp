// import
import gql from 'graphql-tag';

// definition
export const initAdminCookies = gql`
  query initAdminCookies {
    viewer {
      id
      store {
        id
        locale
      }
    }
  }
`;
