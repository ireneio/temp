import postGraphql from 'utils/postGraphql';
import { cartQuery } from './query';

export default async function({ items = [], isServer, cookie }) {
  const variables = {
    keys: '$search: [ChangeCart]',
    type: 'mutation removeItemsToCart',
    values: {
      search: {
        productsInfo: {
          deleteData: items.map(item => item.cartId),
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
}
