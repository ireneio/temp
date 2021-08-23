// graphql typescript
import { productsObjectTypeFragment as productsObjectTypeFragmentType } from '@meepshop/types/gqls/meepshop';

// definition
export const resolvers = {
  productsObjectType: {
    error: ({ serverError, type, variant }: productsObjectTypeFragmentType) => {
      if (serverError && /已下架/.test(serverError))
        return 'PRODUCT_NOT_ONLINE';

      const currentMinPurchasableQty = variant?.currentMinPurchasableQty || 0;

      if (type !== 'product' && (currentMinPurchasableQty === 0 || serverError))
        return 'GIFT_OUT_OF_STOCK';

      if (currentMinPurchasableQty === 0) return 'PRODUCT_SOLD_OUT';

      return null;
    },
  },
};
