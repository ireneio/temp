// import
import { gql } from '@apollo/client';

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
