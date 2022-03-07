// import
import { useMemo, useCallback } from 'react';
import { filter } from 'graphql-anywhere';

import { useCart } from '@meepshop/hooks';

// graphql typescript
import {
  useAddUpsellingUserFragment as useAddUpsellingUserFragmentType,
  useAddUpsellingVariantFragment as useAddUpsellingVariantFragmentType,
  useAddUpsellingLineItemFragment as useAddUpsellingLineItemFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import { useCartFragment } from '@meepshop/hooks/lib/gqls/useCart';

// typescript definition
interface PropsType {
  productId: string;
  viewer: useAddUpsellingUserFragmentType;
  variant: useAddUpsellingVariantFragmentType | null;
  cartItems: (useAddUpsellingLineItemFragmentType | null)[];
  onCancel: () => void;
  isOverLimit: boolean;
  isWithProducts: boolean;
}

interface ReturnType {
  status: 'NO_PRODUCTS' | 'LIMITED' | 'OUT_OF_STOCK' | 'MAX' | 'AVAILABLE';
  addToCart: () => void;
}

// definition
export default ({
  productId,
  viewer,
  variant,
  cartItems,
  onCancel,
  isOverLimit,
  isWithProducts,
}: PropsType): ReturnType => {
  const { upsertCart } = useCart(filter(useCartFragment, viewer || null));
  const quantityInCart = useMemo(
    () =>
      cartItems.find(item => item?.variant?.id === variant?.id)?.quantity || 0,
    [cartItems, variant],
  );
  const status = useMemo(() => {
    if (!isWithProducts) return 'NO_PRODUCTS';

    if (isOverLimit) return 'LIMITED';

    if (!variant?.currentMinPurchasableQty) return 'OUT_OF_STOCK';

    if ((variant.currentMaxPurchasableQty || 0) - quantityInCart <= 0)
      return 'MAX';

    return 'AVAILABLE';
  }, [isOverLimit, isWithProducts, quantityInCart, variant]);

  return {
    status,
    addToCart: useCallback(async () => {
      if (status !== 'AVAILABLE') return;
      // SHOULD_NOT_BE_NULL
      await upsertCart({
        __typename: 'CartItem' as const,
        productId,
        quantity: variant?.currentMinPurchasableQty || 0,
        variantId: variant?.id || 'null-id',
      });
      onCancel();
    }, [onCancel, productId, status, upsertCart, variant]),
  };
};
