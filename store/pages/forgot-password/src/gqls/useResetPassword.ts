// import
import gql from 'graphql-tag';

// definition
export const resetPassword = gql`
  mutation resetPassword($input: SetUserPasswordByTokenInput!) {
    setUserPasswordByToken(input: $input) {
      status
    }
  }
`;
