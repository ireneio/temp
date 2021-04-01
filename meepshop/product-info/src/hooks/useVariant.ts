// import
import { useState, useMemo } from 'react';

import { getQuantityRange } from '@meepshop/product-amount-selector';

// graphql typecript
import {
  useVariantProductFragment,
  useVariantOrderListFragment,
} from '@meepshop/types/gqls/meepshop';

// typescript definition
type VariantType<P extends useVariantProductFragment> = NonNullable<
  NonNullable<P['variants']>[number]
>;

// definition
export default <P extends useVariantProductFragment>(
  product: P | null,
  cart: useVariantOrderListFragment | null,
): {
  variant: VariantType<P> | null;
  setVariant: (variant: VariantType<P> | null) => void;
  min: number;
  max: number;
  quantityInCart: number;
} => {
  const [variant, setVariant] = useState<VariantType<P> | null>(
    (product?.variants?.find(
      productVariant => (productVariant?.stock || 0) > 0,
    ) ||
      product?.variants?.[0] ||
      null) as VariantType<P>,
  );
  const { min, max } = useMemo(() => getQuantityRange(variant), [variant]);
  const quantityInCart = useMemo(
    () =>
      cart?.data?.[0]?.categories?.[0]?.products?.find(
        productInCart => variant && productInCart?.variantId === variant?.id,
      )?.quantity || 0,
    [cart, variant],
  );

  return {
    variant,
    setVariant,
    min,
    max,
    quantityInCart,
  };
};