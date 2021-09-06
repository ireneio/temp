import postGraphql from 'utils/postGraphql';
import { viewer, productQuery } from './query';

export default async context => {
  const {
    query: { pId },
    req: { cookies },
  } = context;
  if (!pId) throw new Error('Product id is not defined.');
  const variables = {
    keys: `
      $productSearch: searchInputObjectType,
      $expireBy: Int!,
      $identity: String,
    `,
    type: 'query serverProductInitial',
    values: {
      productSearch: {
        size: 1,
        from: 0,
        filter: {
          and: [
            {
              type: 'ids',
              ids: [pId],
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
      expireBy: parseInt(new Date() / 1000, 10) + 30 * 24 * 60 * 60, // 30 days
      identity: cookies?.identity,
    },
  };

  const query = `
    ${viewer}
    computeProductList(search: $productSearch) {
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
