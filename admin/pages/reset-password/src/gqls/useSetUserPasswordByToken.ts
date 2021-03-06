// import
import { gql } from '@apollo/client';

// definition
export const isResetPasswordTokenValid = gql`
  query isResetPasswordTokenValid($token: String!) {
    isResetPasswordTokenValid(token: $token)
  }
`;

export const setUserPasswordByToken = gql`
  mutation setUserPasswordByToken($passwordInput: SetUserPasswordByTokenInput) {
    setUserPasswordByToken(passwordInput: $passwordInput) {
      status
    }
  }
`;
