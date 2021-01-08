// import
import gql from 'graphql-tag';

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
