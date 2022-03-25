// import
import { gql } from '@apollo/client';

// definition
export const computedCartInCheckout = gql`
  query computedCartInCheckout($input: computedCartInput!) {
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
    computedCart(input: $input) {
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
