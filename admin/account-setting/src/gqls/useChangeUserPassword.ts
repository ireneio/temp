// import
import gql from 'graphql-tag';

// definition
export const changeUserPassword = gql`
  mutation changeUserPassword($input: ChangeUserPasswordInput) {
    changeUserPassword(input: $input) {
      status
    }
  }
`;
