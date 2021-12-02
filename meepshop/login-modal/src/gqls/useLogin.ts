// import
import { gql } from '@apollo/client';

// definition
export const loginInModal = gql`
  mutation loginInModal($input: LoginInput!) {
    login(input: $input) @client {
      status
    }
  }
`;
