// definition
export const resolvers = {
  User: {
    guestCart: () => JSON.parse(localStorage.getItem('guestCart') || '[]'),
  },
};
