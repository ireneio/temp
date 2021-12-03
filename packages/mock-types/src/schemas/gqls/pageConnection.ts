// import
import { gql } from '@apollo/client';

// definition
export const pageConnectionMockFragment = gql`
  fragment pageConnectionMockFragment on PageConnection {
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
