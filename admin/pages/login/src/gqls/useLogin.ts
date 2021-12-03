// import
import { gql } from '@apollo/client';

// definition
export const login = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) @client {
      status
      role
      adminStatus
      token
    }
  }
`;
