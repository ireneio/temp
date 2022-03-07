// import
import { gql } from '@apollo/client';

// graphql import
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
    specs {
      id
    }
    variants {
      id
      currentMinPurchasableQty
      currentMaxPurchasableQty
    }
  }
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
