// import
import gql from 'graphql-tag';

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
