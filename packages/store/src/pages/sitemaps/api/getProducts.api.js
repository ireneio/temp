import postGraphql from 'utils/postGraphql';

export default async function(args = {}) {
  const {
    isServer,
    XMeepshopDomain,
    cookie,

    offset = 0,
    limit = 20,
  } = args;
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
              query: 1,
            },
          ],
          or: [],
        },
        sort: [
          {
            field: 'createdOn',
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
    query,
    variables,
    isServer,
    XMeepshopDomain,
    cookie,
  });
  return response;
}
