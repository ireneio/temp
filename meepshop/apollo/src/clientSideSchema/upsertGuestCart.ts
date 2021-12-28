// graphql typescript
import { CartItemInput } from '@meepshop/types/gqls/meepshop';

// typescript definiton
interface CartItem extends CartItemInput {
  __typename: 'CartItem';
}

// definition
export const resolvers = {
  Mutation: {
    upsertGuestCart: (
      _: unknown,
      {
        input,
      }: {
        input: CartItemInput[];
      },
    ) => {
      const guestCart = JSON.parse(
        localStorage.getItem('guestCart') || '[]',
      ) as CartItem[];

      input.forEach(({ productId, quantity, variantId }) => {
        const index = guestCart.findIndex(item => item.variantId === variantId);

        if (index === -1) {
          localStorage.setItem(
            'guestCart',
            JSON.stringify([
              ...guestCart,
              { __typename: 'CartItem', productId, quantity, variantId },
            ]),
          );
        } else {
          guestCart[index] = {
            ...guestCart[index],
            quantity: guestCart[index].quantity + quantity,
          };
          localStorage.setItem('guestCart', JSON.stringify(guestCart));
        }
      });

      return {
        __typename: 'OkResponse',
        message: 'SUCCESS',
      };
    },
  },
};
