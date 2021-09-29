// import
import gql from 'graphql-tag';

// definition
export const setOrdersCurrent = gql`
  mutation setOrdersCurrent($input: SetCurrentInput!) {
    setCurrent(input: $input) @client
  }
`;

export const changePageFragment = gql`
  fragment changePageFragment on OrderConnection {
    edges {
      node {
        id
      }
    }
    pageInfo {
      endCursor
      currentInfo(input: { pageId: "member-orders" }) @client {
        id
        current
      }
    }
  }
`;
