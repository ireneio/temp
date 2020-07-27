import postGraphql from 'utils/postGraphql';
import { cartQuery } from './query';

export default async ({ items = [], isServer, cookie }) => {
  const variables = {
    keys: '$search: [ChangeCart]',
    type: 'mutation addItemsToCart',
    values: {
      search: {
        productsInfo: {
          createData: items.map(item => ({
            productId: item.productId,
            variantId: item.variantId,
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
