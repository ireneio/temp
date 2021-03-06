// graphql typescript
import { CartItemInput } from '@meepshop/types/gqls/meepshop';

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
      localStorage.setItem(
        'guestCart',
        JSON.stringify(
          input.map(cartItem => ({
            ...cartItem,
            __typename: 'CartItem',
          })),
        ),
      );

      return {
        __typename: 'OkResponse',
        message: 'SUCCESS',
      };
    },
  },
};
