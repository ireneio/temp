// import
import { gql } from '@apollo/client';

// definition
export const sendResetPswMailFormFragment = gql`
  fragment sendResetPswMailFormFragment on Store {
    id
    cname
  }
`;
