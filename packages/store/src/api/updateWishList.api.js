import postGraphql from 'lib/postGraphql';
import { wishListQuery } from './query';

export default async function({ add = [], remove = [] }) {
  const variables = {
    keys: '$updateWishListList: [UpdateWishList]',
    type: 'mutation UpdateWishList',
    values: {
      updateWishListList: [
        {
          addProductIds: add,
          removeProductIds: remove,
        },
      ],
    },
  };

  const query = `
    updateWishListList(updateWishListList: $updateWishListList) {
      ${wishListQuery}
    }
  `;
  const response = await postGraphql({
    query,
    variables,
  });
  return response;
}
