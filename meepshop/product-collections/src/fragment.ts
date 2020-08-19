// import
import gql from 'graphql-tag';

// graphql import
import localeFragment from '@meepshop/utils/lib/fragments/locale';
import { imageScaledURLsFragment } from '@meepshop/image/lib/fragment';

// definition
export default gql`
  fragment productCollectionsFragment on ProductCollectionsModule {
    id
    productCollectionsType
    percentWidth
    product(productId: $productId) {
      id
      title {
        ...localeFragment
      }
      galleries {
        images {
          fileId
          scaledSrc {
            ...imageScaledURLsFragment
          }
        }
      }
    }
  }

  ${localeFragment}
  ${imageScaledURLsFragment}
`;
