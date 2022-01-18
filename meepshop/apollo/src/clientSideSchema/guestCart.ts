// definition
export const resolvers = {
  User: {
    guestCart: () =>
      typeof window === 'undefined'
        ? {
            __typename: 'ServerGuestCart',
          }
        : {
            __typename: 'GuestCart',
            cartItems: JSON.parse(localStorage.getItem('guestCart') || '[]'),
          },
  },
};
