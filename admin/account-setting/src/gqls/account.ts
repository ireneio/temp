// import
import gql from 'graphql-tag';

// definition
export const accountFragment = gql`
  fragment accountFragment on User {
    id
    email
  }
`;
