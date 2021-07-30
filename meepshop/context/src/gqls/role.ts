// import
import gql from 'graphql-tag';

// definition
export const getRole = gql`
  query getRole {
    viewer {
      id
      role
    }
  }
`;
