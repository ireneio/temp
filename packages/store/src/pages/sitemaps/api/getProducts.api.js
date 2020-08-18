import postGraphql from 'utils/postGraphql';

export default async ({ offset = 0, limit = 20, ...context }) => {
  const variables = {
    keys: '$search: searchInputObjectType',
    type: 'query getProductList',
    values: {
      search: {
        size: parseInt(limit, 10),
        from: parseInt(offset, 10),
        filter: {
          and: [
            {
              type: 'exact',
              field: 'status',
              query: '1',
            },
          ],
          or: [],
        },
        sort: [
          {
            field: 'createdAt',
            order: 'desc',
          },
        ],
      },
    },
  };

  const query = `
    getProductList(search: $search) {
      data {
        id
        title{
          zh_TW
        }
      }
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
