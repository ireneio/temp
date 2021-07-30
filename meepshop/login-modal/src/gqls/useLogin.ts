// import
import gql from 'graphql-tag';

// definition
export const loginInModal = gql`
  mutation loginInModal($input: LoginInput!) {
    login(input: $input) @client {
      status
    }
  }
`;
