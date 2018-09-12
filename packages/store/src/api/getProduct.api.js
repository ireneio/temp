import postGraphql from 'utils/postGraphql';
import { productQuery } from './query';

export default async function({ id, ...context }) {
  const variables = {
    keys: '$search: searchInputObjectType',
    type: 'query getProduct',
    values: {
      search: {
        size: 1,
        from: 0,
        filter: {
          and: [
            {
              type: 'ids',
              ids: [id],
            },
          ],
        },
        sort: [
          {
            field: 'createdOn',
            order: 'desc',
          },
        ],
        showVariants: true,
        showMainFile: true,
        showCartlockQty: true,
      },
    },
  };
  const query = `
    computeProductList(
      search: $search
    ) {
      data ${productQuery}
      total
    }
  `;
  const response = await postGraphql({
    ...context,
    query,
    variables,
  });
  return response;
}
