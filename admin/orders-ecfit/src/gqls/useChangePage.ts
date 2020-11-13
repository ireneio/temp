// import
import gql from 'graphql-tag';

// definition
export const setEcfitOrderCurrent = gql`
  mutation setEcfitOrderCurrent($input: SetCurrentInput!) {
    setCurrent(input: $input) @client
  }
`;

export const useChangePageFragment = gql`
  fragment useChangePageFragment on User {
    id
    ecfitOrders(first: $first, after: $cursor, filter: $filter) {
      edges {
        node {
          id
        }
      }
      pageInfo {
        endCursor
        currentInfo(input: { pageId: "orders-ecfit" }) @client {
          id
          current
        }
      }
    }
  }
`;
