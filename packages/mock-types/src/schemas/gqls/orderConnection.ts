// import
import { gql } from '@apollo/client';

// definition
export const orderConnectionMockFragment = gql`
  fragment orderConnectionMockFragment on OrderConnection {
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
