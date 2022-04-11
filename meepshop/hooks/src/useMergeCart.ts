// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

// graphql typescript
import {
  useMergeCartFragment as useMergeCartFragmentType,
  log as logType,
  logVariables as logVariablesType,
  LogTypeEnum,
  LogNameEnum,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { log } from '@meepshop/logger/lib/gqls/log';

// typescript definition
type mergeCartType<V = useMergeCartFragmentType> = (
  cartItems: V[],
  newCartItem: V,
) => V[];

// definition
export default (): mergeCartType => {
  const [mutation] = useMutation<logType, logVariablesType>(log);

  return useCallback(
    (cartItems, { productId, quantity, variantId }) => {
      const newCartItems = [...cartItems];
      const cartItemIndex = newCartItems.findIndex(
        item => item.variantId === variantId,
      );
      const cartItem = newCartItems[cartItemIndex];

      if (!cartItem)
        newCartItems.push({
          __typename: 'CartItem' as const,
          productId,
          quantity,
          variantId,
        });
      else cartItem.quantity += quantity;

      if (cartItem?.quantity === 0) newCartItems.splice(cartItemIndex, 1);

      if (cartItem?.quantity < 0) {
        newCartItems.splice(cartItemIndex, 1);
        mutation({
          variables: {
            input: {
              type: 'INFO' as LogTypeEnum,
              name: 'MERGE_CART_ERROR' as LogNameEnum,
              data: { cartItems },
            },
          },
        });
      }

      return newCartItems;
    },
    [mutation],
  );
};
