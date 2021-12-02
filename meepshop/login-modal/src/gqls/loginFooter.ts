// import
import { gql } from '@apollo/client';

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
