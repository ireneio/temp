// import
import { gql } from '@apollo/client';

// definition
export const thumbnailFragment = gql`
  fragment thumbnailFragment on Image {
    id
    scaledSrc {
      w60
    }
  }
`;
