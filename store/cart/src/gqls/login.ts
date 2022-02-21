// import
import { gql } from '@apollo/client';

// graphql import
import { lineFragment } from '@meepshop/line/gqls';

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
        lineLoginSetting {
          ...lineFragment
        }
      }
    }
  }

  ${lineFragment}
`;
