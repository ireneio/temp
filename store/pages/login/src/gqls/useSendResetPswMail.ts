// import
import { gql } from '@apollo/client';

// definition
export const sendResetPasswordEmail = gql`
  mutation sendResetPasswordEmail($input: SendResetPasswordEmailInput!) {
    sendResetPasswordEmail(input: $input) {
      status
    }
  }
`;
