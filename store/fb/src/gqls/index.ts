// import
import gql from 'graphql-tag';

// definition
export const getFbAppId = gql`
  query getFbAppId {
    viewer {
      id
      store {
        id
        facebookSetting {
          isLoginEnabled
          appId
        }
      }
    }
  }
`;
