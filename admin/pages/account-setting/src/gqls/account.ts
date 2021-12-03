// import
import { gql } from '@apollo/client';

// definition
export const accountFragment = gql`
  fragment accountFragment on User {
    id
    email
  }
`;
