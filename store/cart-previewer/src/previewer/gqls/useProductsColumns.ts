// import
import gql from 'graphql-tag';

// graphql import
import { thumbnailFragment } from '@meepshop/thumbnail/gqls';
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
export const useProductsColumnsInPreviewerFragment = gql`
  fragment useProductsColumnsInPreviewerFragment on productsObjectType {
    id
    cartId
    productId
    quantity
    type
    activityInfo {
      id
      title {
        ...localeFragment
      }
    }
    retailPrice
    totalPrice
    specs {
      id
      title {
        ...localeFragment
      }
    }
    title {
      ...localeFragment
    }
    coverImage {
      id
      ...thumbnailFragment
    }
    error: _error
  }

  ${thumbnailFragment}
  ${localeFragment}
`;
