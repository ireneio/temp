import postGraphql from 'utils/postGraphql';
import { cartQuery } from './query';

export default async ({ items = [], isServer, cookie }) => {
  const variables = {
    keys: '$search: [ChangeCart]',
    type: 'mutation updateItemsToCart',
    values: {
      search: {
        productsInfo: {
          updateData: items.map(item => ({
            id: item.cartId,
            quantity: item.quantity,
          })),
        },
      },
    },
  };

  const query = `
    changeCartList(changeCartList: $search) {
      ${cartQuery}
    }
  `;
  const response = await postGraphql({
    query,
    variables,
    isServer,
    cookie,
  });
  return response;
};
