// import
import { gql } from '@apollo/client';

// graphql import
import { priceComputedCartFragment } from './price';
import { useProductsColumnsFragment } from './useProductsColumns';

// definition
export const computedCart = gql`
  query computedCart(
    $cartItems: [CartItemInput!]!
    $cartProducts: [CartProductsInput!]!
  ) {
    computedCart(cartItems: $cartItems) {
      ... on ComputedCart {
        computedLineItems {
          id
          ...useProductsColumnsFragment
        }
        ...priceComputedCartFragment
      }
      ... on UnhandledError {
        message
      }
    }
  }

  ${priceComputedCartFragment}
  ${useProductsColumnsFragment}
`;
