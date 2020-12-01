// import
import gql from 'graphql-tag';

// definition
export const forgotPasswordFromLandingPage = gql`
  mutation forgotPasswordFromLandingPage($input: SendResetPasswordEmailInput!) {
    sendResetPasswordEmail(input: $input) {
      status
    }
  }
`;

export const loginFromLandingPage = gql`
  mutation loginFromLandingPage($input: LoginInput!) {
    login(input: $input) @client {
      status
    }
  }
`;
