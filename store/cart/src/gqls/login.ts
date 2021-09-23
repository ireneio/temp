// import
import gql from 'graphql-tag';

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
