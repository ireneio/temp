// graphql typescript
import { productsObjectTypeFragment as productsObjectTypeFragmentType } from '@meepshop/types/gqls/meepshop';

// definition
export const resolvers = {
  productsObjectType: {
    error: ({
      _error: error,
      type,
      stock,
      minPurchaseItems,
    }: productsObjectTypeFragmentType) => {
      if (error && /Product not online/.test(error))
        return 'PRODUCT_NOT_ONLINE';

      if (type !== 'product' && (!stock || stock <= 0 || error))
        return 'GIFT_OUT_OF_STOCK';

      if (
        !stock ||
        stock <= 0 ||
        (stock > 0 && (minPurchaseItems || 0) > stock)
      )
        return 'PRODUCT_SOLD_OUT';

      return null;
    },
  },
};
