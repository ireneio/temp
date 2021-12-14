// import
import { useState } from 'react';

// graphql typecript
import { useVariantFragment as useVariantFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
type VariantType<P extends useVariantFragmentType> = NonNullable<
  NonNullable<P['variants']>[number]
>;

// definition
export default <P extends useVariantFragmentType>(
  product: P,
): {
  variant: VariantType<P> | null;
  setVariant: (variant: VariantType<P> | null) => void;
} => {
  const [variant, setVariant] = useState<VariantType<P> | null>(
    (product.variants?.find(
      productVariant => (productVariant?.currentMinPurchasableQty || 0) > 0,
    ) ||
      product.variants?.[0] ||
      null) as VariantType<P>,
  );

  return {
    variant,
    setVariant,
  };
};
