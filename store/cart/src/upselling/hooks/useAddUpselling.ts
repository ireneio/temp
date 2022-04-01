// import
import { useMemo, useCallback, useContext } from 'react';

import { useCart } from '@meepshop/hooks';
import { AdTrack as AdTrackContext } from '@meepshop/context';
import { useGetLanguage } from '@meepshop/locales';
import filter from '@meepshop/utils/lib/filter';

// graphql typescript
import {
  useAddUpsellingUserFragment as useAddUpsellingUserFragmentType,
  useAddUpsellingVariantFragment as useAddUpsellingVariantFragmentType,
  useAddUpsellingProductFragment as useAddUpsellingProductFragmentType,
  useAddUpsellingLineItemFragment as useAddUpsellingLineItemFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import { useCartFragment } from '@meepshop/hooks/lib/gqls/useCart';

// typescript definition
interface PropsType {
  product: useAddUpsellingProductFragmentType;
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
  product,
  viewer,
  variant,
  cartItems,
  onCancel,
  isOverLimit,
  isWithProducts,
}: PropsType): ReturnType => {
  const { addToCart } = useContext(AdTrackContext);
  const { upsertCart } = useCart(filter(useCartFragment, viewer || null));
  const getLanguage = useGetLanguage();
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
      onCancel();
    }, [
      addToCart,
      getLanguage,
      onCancel,
      product,
      status,
      upsertCart,
      variant,
    ]),
  };
};
