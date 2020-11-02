// import
import gql from 'graphql-tag';

// definition
export const fileConnectionMockFragment = gql`
  fragment fileConnectionMockFragment on FileConnection {
    edges {
      node {
        id
        image
      }
    }
    pageInfo {
      endCursor
    }
    total
  }
`;
