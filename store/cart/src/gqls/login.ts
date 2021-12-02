// import
import { gql } from '@apollo/client';

// definition
export const getLoginMessage = gql`
  query getLoginMessage {
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
