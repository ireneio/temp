// import
import { gql } from '@apollo/client';

// graphql import
import { LineItemFragment } from '@meepshop/apollo/lib/gqls/LineItem';
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';
import { useCartFragment } from '@meepshop/hooks/lib/gqls/useCart';
import { thumbnailFragment } from '@meepshop/thumbnail/gqls';

// definition
export const useProductsColumnsInPreviewerUserFragment = gql`
  fragment useProductsColumnsInPreviewerUserFragment on User {
    id
    ...useCartFragment
  }

  ${useCartFragment}
`;

export const useProductsColumnsInPreviewerLineItemFragment = gql`
  fragment useProductsColumnsInPreviewerLineItemFragment on LineItem {
    id
    ...LineItemFragment
    cartId(cartProducts: $cartProducts) @client
    quantity
    type
    unitPrice
    status
    discountAllocations {
      activityId: id
      title {
        ...localeFragment
      }
    }
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
  }

  ${LineItemFragment}
  ${thumbnailFragment}
  ${localeFragment}
`;
