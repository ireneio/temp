// import
import { gql } from '@apollo/client';

// graphql import
import { formFragment } from './form';

// definition
export const getLogin = gql`
  query getLogin {
    viewer {
      id
      store {
        id
        setting {
          shopperLoginMessageEnabled
          shopperLoginMessage
        }
        ...formFragment
      }
    }
  }

  ${formFragment}
`;
