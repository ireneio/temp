// import
import gql from 'graphql-tag';

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
