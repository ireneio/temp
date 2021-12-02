// import
import { gql } from '@apollo/client';

// definition
export const getStoreLogo = gql`
  query getStoreLogo {
    viewer {
      id
      store {
        id
        logoImage {
          id
          scaledSrc {
            w240
          }
        }
      }
    }
  }
`;
