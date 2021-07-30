// import
import gql from 'graphql-tag';

// definition
export const getIsFbLoginEnabled = gql`
  query getIsFbLoginEnabled {
    viewer {
      id
      store {
        id
        facebookSetting {
          isLoginEnabled
        }
      }
    }
  }
`;
