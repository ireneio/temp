// import
import gql from 'graphql-tag';

// definition
export const setOrderCurrent = gql`
  mutation setOrderCurrent($input: SetCurrentInput!) {
    setCurrent(input: $input) @client
  }
`;

export const useChangePageFragment = gql`
  fragment useChangePageFragment on User {
    id
    orders(first: $first, after: $cursor, filter: $filter) {
      edges {
        node {
          id
        }
      }
      pageInfo {
        endCursor
        currentInfo(input: { pageId: $page }) @client {
          id
          current
        }
      }
    }
  }
`;
