// import
import gql from 'graphql-tag';

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
