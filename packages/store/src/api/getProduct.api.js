import cookie from 'js-cookie';

import postGraphql from 'utils/postGraphql';
import { productQuery } from './query';

export default async ({ id, ...context }) => {
  const variables = {
    keys: '$search: searchInputObjectType, $identity: String',
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
            field: 'createdAt',
            order: 'desc',
          },
        ],
        showVariants: true,
        showMainFile: true,
      },
      identity: cookie.get('identity'),
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
};
