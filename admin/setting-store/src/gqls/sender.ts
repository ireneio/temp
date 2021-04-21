// import
import gql from 'graphql-tag';

// definition
export const senderFragment = gql`
  fragment senderFragment on Store {
    id
    setting {
      senderInfo {
        name
        phoneNumber
        streetAddress
      }
    }
  }
`;
