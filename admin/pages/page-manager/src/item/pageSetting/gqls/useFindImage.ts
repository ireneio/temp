// import
import { gql } from '@apollo/client';

// definition
export const getImage = gql`
  query getImage($id: ID!) {
    viewer {
      id
      image(imageId: $id) {
        id
        scaledSrc {
          h200
          w60
          w120
          w240
          w250
          w480
          w720
          w960
          w1200
          w1440
          w1680
          w1920
        }
      }
    }
  }
`;
