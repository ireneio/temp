// import
import { gql } from '@apollo/client';

// graphql import
import { sendResetPswMailFormFragment } from './sendResetPswMailForm';
import { signupFormFragment } from './signupForm';
import { loginFormFragment } from './loginFrom';

// definition
export const formFragment = gql`
  fragment formFragment on Store {
    id
    lineLoginSetting {
      ...loginFormFragment
    }
    ...sendResetPswMailFormFragment
    ...signupFormFragment
  }

  ${sendResetPswMailFormFragment}
  ${signupFormFragment}
  ${loginFormFragment}
`;
