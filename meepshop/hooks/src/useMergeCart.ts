// import
import { useCallback } from 'react';

// graphql typescript
import { useMergeCartFragment as useMergeCartFragmentType } from '@meepshop/types/gqls/meepshop';

// typescript definition
type mergeCartType<V = useMergeCartFragmentType> = (
  cartItems: V[],
  newCartItem: V,
) => V[];

// definition
export default (): mergeCartType =>
  useCallback((cartItems, { productId, quantity, variantId }) => {
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

    return newCartItems;
  }, []);
