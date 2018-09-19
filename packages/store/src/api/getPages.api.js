import postGraphql from 'utils/postGraphql';
import { pageQuery } from './query';

export default async function({
  id,
  path,
  pageType,
  pageTypes /* use in /pages */,
  ...context
}) {
  const variables = {
    keys: '$search: searchInputObjectType',
    type: 'query getPages',
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
          or: [],
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
  if (pageTypes) {
    pageTypes.forEach(type => {
      variables.values.search.filter.or.push({
        type: 'exact',
        field: 'pageType',
        query: type,
      });
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
    ...context,
    query,
    variables,
  });
  return response;
}
