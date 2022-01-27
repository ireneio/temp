// import
import { gql } from '@apollo/client';

// graphql import
import { useCartFragment } from '@meepshop/hooks/lib/gqls/useCart';

import { priceInPreviewerFragment } from './price';
import { productsInPreviewerLineItemFragment } from './products';

// definition
export const useComputedCartInPreviewerFragment = gql`
  fragment useComputedCartInPreviewerFragment on User {
    id
    ...useCartFragment
  }

  ${useCartFragment}
`;

export const computedCartInPreviewer = gql`
  query computedCartInPreviewer($cartItems: [CartItemInput!]!) {
    computedCart(cartItems: $cartItems) {
      ... on ComputedCart {
        computedLineItems {
          id
          ...productsInPreviewerLineItemFragment
        }
        ...priceInPreviewerFragment
      }

      ... on UnhandledError {
        message
      }
    }
  }

  ${priceInPreviewerFragment}
  ${productsInPreviewerLineItemFragment}
`;
