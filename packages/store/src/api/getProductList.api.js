import * as R from 'ramda';
import postGraphql from 'utils/postGraphql';
import { productQuery } from './query';

export default async function(args = {}) {
  const {
    isServer,
    XMeepshopDomain,
    cookie,

    offset = 0,
    limit = 20,
    includedAllTags = false,
    search,
    sort,
  } = args;
  let { ids, tags, price } = args;
  let variables = {
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

  if (sort) {
    const sortArray = sort.split('-');
    variables = R.assocPath(
      ['values', 'search', 'sort', 0, 'field'],
      sortArray[0],
      variables,
    );
    variables = R.assocPath(
      ['values', 'search', 'sort', 0, 'order'],
      sortArray[1],
      variables,
    );
  }

  if (ids && typeof ids === 'string') {
    ids = ids.split(',');
    variables.values.search.filter.and.push({
      type: 'ids',
      ids,
    });
  }

  if (search) {
    variables.values.search.filter.or.push({
      type: 'query_string',
      child: 'variant',
      fields: ['sku', 'vendorSku'],
      query: search,
    });
    variables.values.search.filter.or.push({
      type: 'query_string',
      fields: ['title.zh_TW'],
      query: search,
    });
  }

  if (tags && typeof tags === 'string') {
    tags = tags.split(',');
    const tagsFilter = tags.map(tag => ({
      type: 'exact',
      field: 'tags',
      query: tag,
    }));
    if (includedAllTags) {
      variables.values.search.filter.and = variables.values.search.filter.and.concat(
        tagsFilter,
      );
    } else {
      variables.values.search.filter.and.push({
        or: tagsFilter,
      });
    }
  }

  if (price) {
    price = price.split(',');
    const gte = parseFloat(price[0]);
    const lte = parseFloat(price[1]);
    const priceRange = {
      type: 'range',
      child: 'variant',
      field: 'retailPrice',
    };
    if (gte) {
      priceRange.gte = price.gte;
    }
    if (lte) {
      priceRange.lte = price.lte;
    }
    variables.values.search.filter.and.push(priceRange);
  }

  const query = `
    computeProductList(
      search: $search
    ) {
      data ${productQuery}
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
