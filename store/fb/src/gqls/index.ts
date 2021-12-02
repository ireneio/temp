// import
import { gql } from '@apollo/client';

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
