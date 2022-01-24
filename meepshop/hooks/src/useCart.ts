// import
import { useMemo, useCallback } from 'react';
import { filter } from 'graphql-anywhere';

import useMergeCart from './useMergeCart';
import useUpsertCart from './useUpsertCart';

// graphql typescript
import {
  useCartFragment as useCartFragmentType,
  useMergeCartFragment as useMergeCartFragmentType,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { useMergeCartFragment } from './gqls/useMergeCart';
import { useUpsertCartUserFragment } from './gqls/useUpsertCart';

// typescript definition
export interface CartType {
  loading: boolean;
  cartItems: useMergeCartFragmentType[];
  upsertCart: (
    cartItem: useMergeCartFragmentType | useMergeCartFragmentType[],
  ) => Promise<void>;
}

// definition
export default (viewer: useCartFragmentType | null): CartType => {
  const isShopper = viewer?.role === 'SHOPPER';
  const { cart, guestCart } = useMemo(
    () => ({
      cart: viewer?.cart?.__typename !== 'Cart' ? [] : viewer.cart.cartItems,
      guestCart:
        viewer?.guestCart?.__typename !== 'GuestCart'
          ? []
          : viewer.guestCart.cartItems,
    }),
    [viewer],
  );
  const mergeCart = useMergeCart();
  const cartItems = useMemo(
    () =>
      !isShopper
        ? filter(useMergeCartFragment, guestCart)
        : filter(useMergeCartFragment, guestCart).reduce(mergeCart, cart),
    [guestCart, cart, isShopper, mergeCart],
  );
  const upsertCart = useUpsertCart(filter(useUpsertCartUserFragment, viewer));

  return {
    loading: viewer?.guestCart?.__typename !== 'GuestCart',
    cartItems,
    upsertCart: useCallback(
      cartItem =>
        upsertCart(
          cartItem instanceof Array ? cartItem : mergeCart(cartItems, cartItem),
        ),
      [cartItems, mergeCart, upsertCart],
    ),
  };
};
