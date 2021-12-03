// import
import { gql } from '@apollo/client';

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
