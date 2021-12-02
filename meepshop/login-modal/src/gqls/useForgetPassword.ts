// import
import { gql } from '@apollo/client';

// definition
export const getStoreCname = gql`
  query getStoreCname {
    viewer {
      id
      store {
        id
        cname
      }
    }
  }
`;

export const forgotPasswordInModal = gql`
  mutation forgotPasswordInModal($input: SendResetPasswordEmailInput!) {
    sendResetPasswordEmail(input: $input) {
      status
    }
  }
`;
