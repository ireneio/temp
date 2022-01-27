// import
import { gql } from '@apollo/client';

// graphql import
import { productAmountSelectorFragment } from '@meepshop/product-amount-selector/gqls';
import { useCartFragment } from '@meepshop/hooks/lib/gqls/useCart';
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';
import { thumbnailFragment } from '@meepshop/thumbnail/gqls';

// definition
export const useProductsColumnsUserFragment = gql`
  fragment useProductsColumnsUserFragment on User {
    id
    ...useCartFragment
  }

  ${useCartFragment}
`;

export const useProductsColumnsLineItemFragment = gql`
  fragment useProductsColumnsLineItemFragment on LineItem {
    id
    productId
    quantity
    variantId
    unitPrice
    type
    status
    discountAllocations {
      activityId: id
      title {
        ...localeFragment
      }
    }
    coverImage {
      id
      ...thumbnailFragment
    }
    title {
      ...localeFragment
    }
    variant {
      id
      ...productAmountSelectorFragment
    }
    specs {
      id
      title {
        ...localeFragment
      }
    }
  }

  ${localeFragment}
  ${thumbnailFragment}
  ${productAmountSelectorFragment}
`;
