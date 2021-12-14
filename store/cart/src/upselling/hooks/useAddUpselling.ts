// import
import { useMemo, useCallback } from 'react';
import { emptyFunction } from 'fbjs';

// graphql typescript
import {
  useAddUpsellingVariantFragment as useAddUpsellingVariantFragmentType,
  useAddUpsellingLineItemFragment as useAddUpsellingLineItemFragmentType,
} from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  productId: string;
  variant: useAddUpsellingVariantFragmentType | null;
  cartItems: (useAddUpsellingLineItemFragmentType | null)[];
  isOverLimit: boolean;
  isWithProducts: boolean;
}

interface ReturnType {
  status: 'NO_PRODUCTS' | 'LIMITED' | 'OUT_OF_STOCK' | 'MAX' | 'AVAILABLE';
  addToCart: () => void;
}

// definition
export default ({
  variant,
  cartItems,
  isOverLimit,
  isWithProducts,
}: PropsType): ReturnType => {
  const quantityInCart = useMemo(
    () =>
      cartItems.find(item => item?.variant?.id === variant?.id)?.quantity || 0,
    [cartItems, variant],
  );

  const status = useMemo(() => {
    if (!isWithProducts) return 'NO_PRODUCTS';

    if (isOverLimit) return 'LIMITED';

    if (!variant?.currentMinPurchasableQty) return 'OUT_OF_STOCK';

    if (variant.currentMinPurchasableQty - quantityInCart <= 0) return 'MAX';

    return 'AVAILABLE';
  }, [isOverLimit, isWithProducts, quantityInCart, variant]);

  return {
    status,
    addToCart: useCallback(() => {
      if (status !== 'AVAILABLE') return;

      // update cart
      emptyFunction();
    }, [status]),
  };
};
