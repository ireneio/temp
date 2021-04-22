import { useMemo, useEffect, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { AdTrack as AdTrackContext } from '@meepshop/context';

import { getProducts } from '../gqls/useProducts';

export default ({
  id,
  ids,
  tags,
  price,
  offset,
  limit,
  includedAllTags,
  search,
  sort,
}) => {
  const adTrack = useContext(AdTrackContext);
  const variables = useMemo(() => {
    const [field, order] = String(sort).split('-');
    const output = {
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
      if (sort === 'selections')
        output.search.filter.and.push({
          type: 'ids',
          ids: ids
            .split(',')
            .slice(
              parseInt(offset, 10),
              parseInt(offset, 10) + parseInt(limit, 10),
            ),
        });
      else
        output.search.filter.and.push({
          type: 'ids',
          ids: ids.split(','),
        });
    }

    if (typeof search === 'string' && search !== '')
      output.search.filter.or.push(
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

    if (typeof tags === 'string' && tags !== '') {
      const tagsFilter = tags.split(',').map(query => ({
        type: 'exact',
        field: 'tags',
        query,
      }));

      output.search.filter.and = output.search.filter.and.concat(
        includedAllTags ? tagsFilter : [{ or: tagsFilter }],
      );
    }

    if (typeof price === 'string' && price !== '') {
      const [gte, lte] = price.split(',');

      output.search.filter.and.push({
        type: 'range',
        child: 'variant',
        field: 'retailPrice',
        ...(!gte ? {} : { gte: parseFloat(gte) }),
        ...(!lte ? {} : { lte: parseFloat(lte) }),
      });
    }

    return output;
  }, [ids, tags, price, offset, limit, includedAllTags, search, sort]);
  const { data, loading } = useQuery(getProducts, { variables });

  useEffect(() => {
    if (data?.computeProductList?.data) {
      const dom = document.getElementById(id);

      if (dom) dom.scrollIntoView({ behavior: 'smooth' });
    }

    if (search && data?.computeProductList?.data)
      adTrack.search({
        searchString: search,
        products: data.computeProductList.data,
      });
  }, [id, adTrack, data, search]);

  return {
    data: useMemo(() => {
      if (!data || !ids || sort !== 'selections') return data;

      const order = String(ids).split(',');

      // FIXME: custom sorting workaround
      return {
        ...data,
        computeProductList: {
          ...data.computeProductList,
          data: data.computeProductList.data.sort(
            (a, b) => order.indexOf(a.id) - order.indexOf(b.id),
          ),
        },
      };
    }, [data, ids, sort]),
    loading,
  };
};
