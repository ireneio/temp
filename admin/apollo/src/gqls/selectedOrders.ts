// import
import gql from 'graphql-tag';

// definition
export const initializeSelectedOrders = gql`
  query initializeSelectedOrders {
    selectedOrders @client {
      edges {
        node {
          id
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      total
    }
  }
`;
