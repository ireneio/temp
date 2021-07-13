// graphql typescript
import { productsObjectTypeFragment as productsObjectTypeFragmentType } from '@meepshop/types/gqls/meepshop';

// definition
export const resolvers = {
  productsObjectType: {
    error: ({ error, type, variant }: productsObjectTypeFragmentType) => {
      if (error && /已下架/.test(error)) return 'PRODUCT_NOT_ONLINE';

      const currentMinPurchasableQty = variant?.currentMinPurchasableQty || 0;
      const currentMaxPurchasableQty = variant?.currentMaxPurchasableQty || 0;

      if (
        type !== 'product' &&
        (currentMaxPurchasableQty <= currentMinPurchasableQty || error)
      )
        return 'GIFT_OUT_OF_STOCK';

      if (currentMaxPurchasableQty <= currentMinPurchasableQty)
        return 'PRODUCT_SOLD_OUT';

      return null;
    },
  },
};
