// import
import { gql } from '@apollo/client';

// definition
export const computedCartInCheckout = gql`
  query computedCartInCheckout($cartItems: [CartItemInput!]!) {
    viewer {
      id
      store {
        id
        activeUpsellingArea {
          id
          limitPerOrder
        }
      }
    }
    computedCart(cartItems: $cartItems) {
      ... on ComputedCart {
        computedLineItems {
          type
          cartId: id
          productId
          quantity
          variantId
        }
      }

      ... on UnhandledError {
        message
      }
    }
  }
`;
