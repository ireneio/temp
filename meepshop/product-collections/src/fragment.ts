// import
import gql from 'graphql-tag';

// graphql import
import localeFragment from '@meepshop/utils/lib/fragments/locale';
import { imageScaledURLsFragment } from '@meepshop/image/lib/fragments';

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
          id
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
