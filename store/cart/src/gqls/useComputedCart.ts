// import
import { gql } from '@apollo/client';

// graphql import
import { useCartFragment } from '@meepshop/hooks/lib/gqls/useCart';

import { priceComputedCartFragment } from './price';
import { productsLineItemFragment } from './products';
import { upsellingLineItemFragment } from '../upselling/gqls';
import { useInitialValueFragment } from './useInitialValue';

// definition
export const useComputedCartFragment = gql`
  fragment useComputedCartFragment on User {
    id
    ...useCartFragment
  }

  ${useCartFragment}
`;

export const computedCart = gql`
  query computedCart($cartItems: [CartItemInput!]!) {
    computedCart(cartItems: $cartItems) {
      ... on ComputedCart {
        computedLineItems {
          id
          ...productsLineItemFragment
          ...upsellingLineItemFragment
          ...useInitialValueFragment
        }
        ...priceComputedCartFragment
      }

      ... on UnhandledError {
        message
      }
    }
  }

  ${priceComputedCartFragment}
  ${productsLineItemFragment}
  ${upsellingLineItemFragment}
  ${useInitialValueFragment}
`;
