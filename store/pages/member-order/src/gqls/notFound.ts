// import
import gql from 'graphql-tag';

// definition
export const notFoundFragment = gql`
  fragment notFoundFragment on User {
    id
    name
    email
  }
`;
