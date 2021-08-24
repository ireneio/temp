// import
import gql from 'graphql-tag';

// graphql import
import { productsObjectTypeFragment } from '@meepshop/apollo/lib/gqls/productsObjectType';
import { productAmountSelectorFragment } from '@meepshop/product-amount-selector/gqls';
import { thumbnailFragment } from '@meepshop/thumbnail/gqls';
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
export const useProductsColumnsFragment = gql`
  fragment useProductsColumnsFragment on productsObjectType {
    id
    cartId
    productId
    variantId
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
    variant {
      id
      ...productAmountSelectorFragment
    }
    error @client

    ...productsObjectTypeFragment
  }

  ${productsObjectTypeFragment}
  ${productAmountSelectorFragment}
  ${thumbnailFragment}
  ${localeFragment}
`;
