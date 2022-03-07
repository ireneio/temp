// import
import { useMemo, useCallback } from 'react';
import { filter } from 'graphql-anywhere';

import { useCart } from '@meepshop/hooks';

// graphql typescript
import {
  useAddToCartUserFragment as useAddToCartUserFragmentType,
  useAddToCartProductFragment as useAddToCartProductFragmentType,
  useAddToCartLineItemFragment as useAddToCartLineItemFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import { useCartFragment } from '@meepshop/hooks/lib/gqls/useCart';

// typescript definition
interface PropsType {
  viewer: useAddToCartUserFragmentType;
  product: useAddToCartProductFragmentType;
  cartItems: (useAddToCartLineItemFragmentType | null)[];
  setVisible: (visible: boolean) => void;
  isOverLimit: boolean;
}

interface ReturnType {
  status: 'AVAILABLE' | 'OUT_OF_STOCK' | 'LIMITED';
  addToCart: () => void;
}

// definition
export default ({
  viewer,
  product,
  cartItems,
  setVisible,
  isOverLimit,
}: PropsType): ReturnType => {
  const { upsertCart } = useCart(filter(useCartFragment, viewer));
  const availableQuantity =
    useMemo(
      () =>
        product.variants?.reduce((prev, variant) => {
          if (!variant?.currentMinPurchasableQty) return prev;
          if (!variant.currentMaxPurchasableQty) return prev;

          const variantInCart = cartItems.find(
            item => item?.variant?.id === variant.id,
          );

          if (!variantInCart) return prev + variant.currentMinPurchasableQty;

          return (variantInCart.quantity || 0) >=
            variant.currentMaxPurchasableQty
            ? prev
            : prev + variant.currentMaxPurchasableQty;
        }, 0),
      [cartItems, product.variants],
    ) || 0;

  return {
    status: useMemo(() => {
      if (isOverLimit) return 'LIMITED';

      return availableQuantity > 0 ? 'AVAILABLE' : 'OUT_OF_STOCK';
    }, [availableQuantity, isOverLimit]),
    addToCart: useCallback(() => {
      if (isOverLimit || !availableQuantity) return;

      if (product.specs?.length) {
        setVisible(true);
      } else {
        const variant = product.variants?.[0];
        // SHOULD_NOT_BE_NULL
        upsertCart({
          __typename: 'CartItem' as const,
          productId: product.id || 'null-id',
          quantity: variant?.currentMinPurchasableQty || 0,
          variantId: variant?.id || 'null-id',
        });
      }
    }, [isOverLimit, availableQuantity, product, setVisible, upsertCart]),
  };
};
