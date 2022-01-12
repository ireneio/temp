// import
import { gql } from '@apollo/client';

// definition
export const changeUserPassword = gql`
  mutation changeUserPassword($passwordInput: ChangeUserPasswordInput) {
    changeUserPassword(passwordInput: $passwordInput) {
      status
    }
  }
`;
