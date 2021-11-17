// import
import gql from 'graphql-tag';

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
