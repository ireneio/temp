// import
import { gql } from '@apollo/client';

// graphql import
import { useCartFragment } from '@meepshop/hooks/lib/gqls/useCart';
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';
import { thumbnailFragment } from '@meepshop/thumbnail/gqls';

import {
  productAmountSelectorUserFragment,
  productAmountSelectorLineItemFragment,
} from './productAmountSelector';

// definition
export const useProductsColumnsUserFragment = gql`
  fragment useProductsColumnsUserFragment on User {
    id
    ...useCartFragment
    ...productAmountSelectorUserFragment
  }

  ${useCartFragment}
  ${productAmountSelectorUserFragment}
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
    specs {
      id
      title {
        ...localeFragment
      }
    }
    ...productAmountSelectorLineItemFragment
  }

  ${localeFragment}
  ${thumbnailFragment}
  ${productAmountSelectorLineItemFragment}
`;
