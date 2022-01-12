// import
import { gql } from '@apollo/client';

// definition
export const resetPassword = gql`
  mutation resetPassword($passwordInput: SetUserPasswordByTokenInput) {
    setUserPasswordByToken(passwordInput: $passwordInput) {
      status
    }
  }
`;
