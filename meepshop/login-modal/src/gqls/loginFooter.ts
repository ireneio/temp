// import
import gql from 'graphql-tag';

// definition
export const getLoginSetting = gql`
  query getLoginSetting {
    viewer {
      id
      store {
        id
        setting {
          shopperLoginMessageEnabled
          shopperLoginMessage
        }
      }
    }
  }
`;
