// import
import gql from 'graphql-tag';

// graphql import
import localeFragment from '@meepshop/utils/lib/fragments/locale';
import {
  imageImageFragment,
  imageScaledURLsFragment,
} from '@meepshop/image/lib/fragment';

// definition
export default gql`
  fragment productCarouselFragment on ProductCarouselModule {
    id
    productCarouselType
    autoPlay
    product(productId: $productId) {
      id
      title {
        ...localeFragment
      }
      coverImage {
        ...imageImageFragment
      }
      galleries {
        images {
          id
          scaledSrc {
            ...imageScaledURLsFragment
          }
        }
      }
    }
  }

  ${localeFragment}
  ${imageImageFragment}
  ${imageScaledURLsFragment}
`;
