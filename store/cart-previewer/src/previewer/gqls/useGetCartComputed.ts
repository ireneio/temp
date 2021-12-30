// import
import { gql } from '@apollo/client';

// graphql import
import { priceInPreviewerFragment } from './price';
import { useProductsColumnsInPreviewerFragment } from './useProductsColumns';

// definition
export const getComputedCart = gql`
  query getComputedCart(
    $cartItems: [CartItemInput!]!
    $cartProducts: [CartProductsInput!]!
  ) {
    computedCart(cartItems: $cartItems) {
      ... on ComputedCart {
        computedLineItems {
          id
          ...useProductsColumnsInPreviewerFragment
        }
        ...priceInPreviewerFragment
      }
      ... on UnhandledError {
        message
      }
    }
  }

  ${priceInPreviewerFragment}
  ${useProductsColumnsInPreviewerFragment}
`;
