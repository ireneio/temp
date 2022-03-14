// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';
import { useCartFragment } from '@meepshop/hooks/lib/gqls/useCart';

// definition
export const useAddToCartUserFragment = gql`
  fragment useAddToCartUserFragment on User {
    id
    ...useCartFragment
  }

  ${useCartFragment}
`;

export const useAddToCartProductFragment = gql`
  fragment useAddToCartProductFragment on Product {
    id
    title {
      ...localeFragment
    }
    specs {
      id
      title {
        ...localeFragment
      }
    }
    variants {
      id
      totalPrice
      currentMinPurchasableQty
      currentMaxPurchasableQty
    }
  }

  ${localeFragment}
`;

export const useAddToCartLineItemFragment = gql`
  fragment useAddToCartLineItemFragment on LineItem {
    id
    variant {
      id
    }
    quantity
  }
`;
