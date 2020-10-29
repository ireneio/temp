// import
import gql from 'graphql-tag';

// graphql import
import {
  useImageImageFragment,
  useImageScaledURLsFragment,
} from '@meepshop/image/lib/gqls';

// definition
export const useImagesFragment = gql`
  fragment useImagesFragment on Product {
    id
    coverImage {
      ...useImageImageFragment
    }
    galleries {
      images {
        id
        scaledSrc {
          ...useImageScaledURLsFragment
        }
      }
    }
  }

  ${useImageImageFragment}
  ${useImageScaledURLsFragment}
`;
