// import
import { gql } from '@apollo/client';

// definition
export const notFoundFragment = gql`
  fragment notFoundFragment on User {
    id
    name
    email
  }
`;
