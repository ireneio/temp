// import
import { gql } from '@apollo/client';

// definition
export const changeUserPassword = gql`
  mutation changeUserPassword($input: ChangeUserPasswordInput) {
    changeUserPassword(input: $input) {
      status
    }
  }
`;
