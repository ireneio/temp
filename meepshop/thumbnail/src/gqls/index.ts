// import
import gql from 'graphql-tag';

// definition
export const thumbnailFragment = gql`
  fragment thumbnailFragment on Image {
    id
    scaledSrc {
      w120
    }
  }
`;
