// import
import { useMemo, useCallback, useContext } from 'react';

import { useCart } from '@meepshop/hooks';
import { AdTrack as AdTrackContext } from '@meepshop/context';
import { useGetLanguage } from '@meepshop/locales';
import filter from '@meepshop/utils/lib/filter';

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
  const { addToCart } = useContext(AdTrackContext);
  const { upsertCart } = useCart(filter(useCartFragment, viewer));
  const getLanguage = useGetLanguage();
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

        addToCart({
          eventName: 'upselling',
          id: product.id || 'null-id',
          title: {
            // eslint-disable-next-line @typescript-eslint/camelcase
            zh_TW: getLanguage(product.title),
          },
          quantity: variant?.currentMinPurchasableQty || 0,
          specs: product.specs,
          price: variant?.totalPrice || 0,
        });
      }
    }, [
      isOverLimit,
      availableQuantity,
      product,
      setVisible,
      upsertCart,
      addToCart,
      getLanguage,
    ]),
  };
};
