// typescript definition
// FIXME 應該用 @meepshop/types generated types
interface GuestCartType {
  __typename: 'CartItem';
  productId: string;
  quantity: number;
  variantId: string;
}

// definition
export const resolvers = {
  Mutation: {
    upsertGuestCart: (
      _: unknown,
      {
        input: { productId, quantity, variantId },
      }: {
        input: GuestCartType;
      },
    ) => {
      const guestCart = JSON.parse(
        localStorage.getItem('guestCart') || '[]',
      ) as GuestCartType[];
      const index = guestCart.findIndex(p => p.productId === productId);

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

      return {
        __typename: 'OkResponse',
        message: 'SUCCESS',
      };
    },
  },
};
