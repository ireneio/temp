export default ({
  ids,
  tags,
  price,
  offset,
  limit,
  includedAllTags,
  search,
  sort,
}) => {
  const [field, order] = String(sort).split('-');
  const variables = {
    search: {
      size: parseInt(limit, 10),
      // FIXME: custom sorting workaround
      from: sort === 'selections' ? 0 : parseInt(offset, 10),
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
          field,
          order,
        },
      ],
      showVariants: true,
      showMainFile: true,
    },
  };

  if (typeof ids === 'string' && ids !== '') {
    // FIXME: custom sorting workaround
    if (sort === 'selections') {
      variables.search.filter.and.push({
        type: 'ids',
        ids: ids
          .split(',')
          .slice(
            parseInt(offset, 10),
            parseInt(offset, 10) + parseInt(limit, 10),
          ),
      });
    } else {
      variables.search.filter.and.push({
        type: 'ids',
        ids: ids.split(','),
      });
    }
  }

  if (typeof search === 'string' && search !== '') {
    variables.search.filter.or.push(
      {
        type: 'query_string',
        child: 'variant',
        fields: ['sku', 'vendorSku'],
        query: search,
      },
      {
        type: 'query_string',
        fields: ['title.zh_TW'],
        query: search,
      },
    );
  }

  if (typeof tags === 'string' && tags !== '') {
    const tagsFilter = tags.split(',').map(query => ({
      type: 'exact',
      field: 'tags',
      query,
    }));

    variables.search.filter.and = variables.search.filter.and.concat(
      includedAllTags ? tagsFilter : [{ or: tagsFilter }],
    );
  }

  if (typeof price === 'string' && price !== '') {
    const [gte, lte] = price.split(',');

    variables.search.filter.and.push({
      type: 'range',
      child: 'variant',
      field: 'retailPrice',
      ...(!gte ? {} : { gte: parseFloat(gte) }),
      ...(!lte ? {} : { lte: parseFloat(lte) }),
    });
  }

  return [
    `query ProductList($search: searchInputObjectType) {
      computeProductList(
        search: $search
      ) {
        data {
          id
          title {
            zh_TW
            en_US
          }
          description {
            zh_TW
            en_US
          }
          variants {
            id
            stock
            listPrice
            suggestedPrice
            totalPrice
          }
          coverImage {
            fileId
            scaledSrc {
              w60
              w120
              w240
              w480
              w720
              w960
              w1200
              w1440
              w1680
              w1920
            }
          }
          showUserPrice {
            showListPrice
            showSuggestedPrice
          }
        }
        total
      }
    }`,
    variables,
  ];
};

export const getOriginalProductsQuery = () => [
  `query ProductList($search: searchInputObjectType) {
    computeProductList(
      search: $search
    ) {
      total
    }
  }`,
  {
    search: {
      size: 1,
      from: 0,
    },
  },
];
