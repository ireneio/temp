// import
import { gql } from '@apollo/client';

// definition
export const getRole = gql`
  query getRole {
    viewer {
      id
      role
    }
  }
`;
