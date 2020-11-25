// import
import gql from 'graphql-tag';

// definition
export const menuIconMockFragment = gql`
  fragment menuIconMockFragment on MenuIcon {
    ... on Image {
      __typename
    }

    ... on DefaultIcon {
      icon
    }
  }
`;
