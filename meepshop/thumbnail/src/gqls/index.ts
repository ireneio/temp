// import
import { gql } from '@apollo/client';

// definition
export const thumbnailFragment = gql`
  fragment thumbnailFragment on Image {
    id
    scaledSrc {
      w60
      w120
      w240
      w480
      w720
      w960
      w1200
      w1440
      w1680
      w1920
    }
  }
`;
