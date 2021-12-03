// import
import { gql } from '@apollo/client';

// definition
export const adminProductsConnectionMockFragment = gql`
  fragment adminProductsConnectionMockFragment on AdminProductsConnection {
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
