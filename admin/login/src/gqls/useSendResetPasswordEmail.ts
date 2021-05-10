// import
import gql from 'graphql-tag';

// definition
export const sendResetPasswordEmail = gql`
  mutation sendResetPasswordEmail($input: SendResetPasswordEmailInput!) {
    sendResetPasswordEmail(input: $input) {
      status
    }
  }
`;
