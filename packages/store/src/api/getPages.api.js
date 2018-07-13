import postGraphql from 'utils/postGraphql';
import { pageQuery } from './query';

export default async function({
  id,
  path,
  pageType,
  isServer,
  XMeepshopDomain,
}) {
  const variables = {
    keys: '$search: searchInputObjectType',
    type: 'query Root',
    values: {
      search: {
        size: 50,
        from: 0,
        sort: [
          {
            field: 'createdOn',
            order: 'asc',
          },
        ],
        filter: {
          and: [],
        },
      },
    },
  };
  if (id) {
    variables.values.search.filter.and.push({
      type: 'ids',
      ids: [id],
    });
  }
  if (path) {
    variables.values.search.filter.and.push({
      type: 'exact',
      field: 'path',
      query: path,
    });
  }
  if (pageType) {
    variables.values.search.filter.and.push({
      type: 'exact',
      field: 'pageType',
      query: pageType,
    });
  }
  const query = `
    getPageList(
      search: $search
    ) {
      data {
        ${pageQuery}
      }
      total
    }
  `;
  const response = await postGraphql({
    query,
    variables,
    isServer,
    XMeepshopDomain,
  });
  return response;
}
