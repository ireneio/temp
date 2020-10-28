// import
import gql from 'graphql-tag';

// graphql import
import localeFragment from '@meepshop/utils/lib/fragments/locale';
import { useImageScaledURLsFragment } from '@meepshop/image/lib/gqls';

// definition
export default gql`
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
