const PRODUCT_QUERY = `{
  id
  status
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
    specs {
      id
      specId
      title {
        zh_TW
        en_US
      }
    }
    stock
    maxPurchaseLimit
    minPurchaseItems
    sku
    listPrice
    retailPrice
    suggestedPrice
    discountPrice
    totalPrice
  }
  specs {
    id
    title {
      zh_TW
      en_US
    }
  }
  design {
    pageId
    templateId
  }
  contentGallery {
    media
  }
  contentGalleryInfo {
    media
  }
  gallery {
    mainId
    media
  }
  galleryInfo {
    mainId
    media
  }
}`;

export default (params, getData) => {
  const { offset, limit, includedAllTags, search, sort } = params;
  let { ids, tags, price } = params;

  const variables = {
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
          field: sort.split('-')[0],
          order: sort.split('-')[1],
        },
      ],
      showVariants: true,
      showMainFile: true,
    },
  };

  if (ids && typeof ids === 'string') {
    ids = ids.split(',');
    variables.search.filter.and.push({
      type: 'ids',
      ids,
    });
  }

  if (search) {
    variables.search.filter.or.push({
      type: 'query_string',
      child: 'variant',
      fields: ['sku', 'vendorSku'],
      query: search,
    });
    variables.search.filter.or.push({
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
      variables.search.filter.and = variables.search.filter.and.concat(
        tagsFilter,
      );
    } else {
      variables.search.filter.and.push({
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
    variables.search.filter.and.push(priceRange);
  }

  const query = `
      query ProductList($search: searchInputObjectType) {
        computeProductList(
          search: $search
        ) {
          data ${PRODUCT_QUERY}
          total
        }
      }
    `;

  return getData(query, variables);
};
