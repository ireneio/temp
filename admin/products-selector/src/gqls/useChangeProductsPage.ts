// import
import { gql } from '@apollo/client';

// definition
export const setAdminProductsCurrent = gql`
  mutation setAdminProductsCurrent($input: SetCurrentInput!) {
    setCurrent(input: $input) @client
  }
`;
export const useChangeProductsPageFragment = gql`
  fragment useChangeProductsPageFragment on AdminProductsConnection {
    edges {
      node {
        id
      }
    }
    pageInfo {
      endCursor
      currentInfo(input: { pageId: "products-selector" }) @client {
        id
        current
      }
    }
  }
`;
