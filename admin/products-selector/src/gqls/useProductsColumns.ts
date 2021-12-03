// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';
import { thumbnailFragment } from '@meepshop/thumbnail/gqls';

// definition
export const useProductsColumnsFragment = gql`
  fragment useProductsColumnsFragment on Product {
    id
    status
    title {
      ...localeFragment
    }
    coverImage {
      id
      ...thumbnailFragment
    }
    variants {
      id
      sku
      stock
      retailPrice
    }
  }

  ${localeFragment}
  ${thumbnailFragment}
`;
