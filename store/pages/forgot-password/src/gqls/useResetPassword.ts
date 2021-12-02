// import
import { gql } from '@apollo/client';

// definition
export const resetPassword = gql`
  mutation resetPassword($input: SetUserPasswordByTokenInput!) {
    setUserPasswordByToken(input: $input) {
      status
    }
  }
`;
