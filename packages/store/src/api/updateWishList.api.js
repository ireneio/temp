import postGraphql from 'utils/postGraphql';

export default async ({ add, remove }) => {
  const result = await postGraphql({
    query: `
    ${remove ? 'removeWishlistProduct' : 'addWishlistProduct'} (
      input: $input
    ) {
      ${
        remove
          ? 'productId'
          : `
        wishlistProduct {
          id
          productId
          createdAt
          title {
            zh_TW
          }
          coverImage {
            src
          }
          isAvailableForSale
        }
      `
      }
    }
  `,
    variables: {
      type: remove ? 'mutation removeWishlist' : 'mutation addWishlist',
      keys: remove
        ? '$input: RemoveWishlistProductInput!'
        : '$input: AddWishlistProductInput!',
      values: {
        input: {
          productId: remove || add,
        },
      },
    },
  });

  return result;
};
