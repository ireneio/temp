// import
import gql from 'graphql-tag';

// definition
export const iconMockFragment = gql`
  fragment iconMockFragment on Icon {
    ... on Image {
      __typename
    }

    ... on DefaultIcon {
      icon
    }
  }
`;
