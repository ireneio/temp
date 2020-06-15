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
            scaledSrc {
              w60
              w120
              w240
              w480
              w720
              w960
              w1200
              w1440
              w1680
              w1920
            }
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
