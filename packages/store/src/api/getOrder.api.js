import postGraphql from 'utils/postGraphql';
import { orderQuery } from './query';

export default async function({ orderId }) {
  const variables = {
    keys: '$search: searchInputObjectType',
    type: 'query Root',
    values: {
      search: {
        filter: {
          and: [
            {
              type: 'ids',
              ids: [orderId],
            },
          ],
        },
      },
    },
  };

  const query = `
    getOrderList(
      search: $search
    ) {
      data ${orderQuery}
      total
    }
  `;

  const response = await postGraphql({
    query,
    variables,
  });
  return response;
}
