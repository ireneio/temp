// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';
import { useImageScaledURLsFragment } from '@meepshop/image/gqls';

// definition
export const productCollectionsProductFragment = gql`
  fragment productCollectionsProductFragment on Product {
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

  ${localeFragment}
  ${useImageScaledURLsFragment}
`;

export const productCollectionsProductCollectionsModuleFragment = gql`
  fragment productCollectionsProductCollectionsModuleFragment on ProductCollectionsModule {
    id
    productCollectionsType
    percentWidth
    product {
      id
      ...productCollectionsProductFragment
    }
  }

  ${productCollectionsProductFragment}
`;
