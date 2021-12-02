// graphql typescript
import { LineItemFragment as LineItemFragmentType } from '@meepshop/types/gqls/store';

// definition
// FIXME: T9918
export const resolvers = {
  LineItem: {
    cartId: (
      { productId }: LineItemFragmentType,
      {
        cartProducts,
      }: { cartProducts: { productId: string; cartId: string }[] },
    ) =>
      cartProducts.find(product => product.productId === productId)?.cartId ||
      'CartId',
  },
};
