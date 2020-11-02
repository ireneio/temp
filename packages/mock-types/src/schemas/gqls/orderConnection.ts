// import
import gql from 'graphql-tag';

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
