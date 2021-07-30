// import
import gql from 'graphql-tag';

// definition
export const fbLoginInModal = gql`
  mutation fbLoginInModal($input: FbLoginInput!) {
    fbLogin(input: $input) @client {
      status
    }
  }
`;
