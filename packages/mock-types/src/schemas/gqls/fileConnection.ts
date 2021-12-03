// import
import { gql } from '@apollo/client';

// definition
export const fileConnectionMockFragment = gql`
  fragment fileConnectionMockFragment on FileConnection {
    edges {
      node {
        id
      }
    }
    pageInfo {
      endCursor
    }
    total
  }
`;
