// import
import { useMemo, useCallback } from 'react';
import { emptyFunction } from 'fbjs';

// graphql typescript
import {
  useAddToCartProductFragment as useAddToCartProductFragmentType,
  useAddToCartLineItemFragment as useAddToCartLineItemFragmentType,
} from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
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
  product,
  cartItems,
  setVisible,
  isOverLimit,
}: PropsType): ReturnType => {
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

          return variantInCart.quantity >= variant.currentMaxPurchasableQty
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
        // update cart
        emptyFunction();
      }
    }, [availableQuantity, product, setVisible, isOverLimit]),
  };
};
