// import
import { gql } from '@apollo/client';

// graphql import
import { useImageScaledURLsFragment } from '@meepshop/image/gqls';

// definition
export const useImagesFragment = gql`
  fragment useImagesFragment on Product {
    id
    coverImage {
      id
    }
    galleries {
      images {
        id
        imageExists
        scaledSrc {
          ...useImageScaledURLsFragment
        }
      }
    }
  }

  ${useImageScaledURLsFragment}
`;
