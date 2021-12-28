// import
import { useMemo } from 'react';

// graphql typescript
import {
  useMergeCartUserFragment as useMergeCartUserFragmentType,
  useMergeCartCartItemFragment as useMergeCartCartItemFragmentType,
} from '@meepshop/types/gqls/meepshop';

// definition
export default ({
  cart,
  guestCart,
}: useMergeCartUserFragmentType): useMergeCartCartItemFragmentType[] =>
  useMemo(() => {
    return guestCart.reduce(
      (prev, { productId, quantity, variantId }) => {
        const index = prev.findIndex(item => item.variantId === variantId);

        if (index === -1) {
          return [
            ...prev,
            {
              __typename: 'CartItem' as const,
              productId,
              quantity,
              variantId,
            },
          ];
        }

        // eslint-disable-next-line no-param-reassign
        prev[index] = {
          ...prev[index],
          quantity: prev[index].quantity + quantity,
        };

        return prev;
      },
      cart?.__typename === 'Cart' ? [...cart.cartItems] : [],
    );
  }, [cart, guestCart]);
