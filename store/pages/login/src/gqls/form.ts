// import
import { gql } from '@apollo/client';

// graphql import
import { sendResetPswMailFormFragment } from './sendResetPswMailForm';
import { signupFormFragment } from './signupForm';

// definition
export const formFragment = gql`
  fragment formFragment on Store {
    id
    ...sendResetPswMailFormFragment
    ...signupFormFragment
  }

  ${sendResetPswMailFormFragment}
  ${signupFormFragment}
`;
