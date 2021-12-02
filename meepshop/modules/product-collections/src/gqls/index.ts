// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';
import { useImageScaledURLsFragment } from '@meepshop/image/gqls';

// definition
export const productCollectionsFragment = gql`
  fragment productCollectionsFragment on ProductCollectionsModule {
    id
    productCollectionsType
    percentWidth
    product {
      id
      title {
        ...localeFragment
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
  }

  ${localeFragment}
  ${useImageScaledURLsFragment}
`;
