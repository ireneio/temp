import { useMemo, useEffect, useContext } from 'react';
import { usePrevious } from 'react-use';
import { useQuery } from '@apollo/client';
import { areEqual } from 'fbjs';

import { AdTrack as AdTrackContext } from '@meepshop/context';

import { getProducts } from '../gqls/useProducts';

const SORT_FIELDS = [
  'createdAt-desc',
  'title.zh_TW-asc',
  'variantInfo.firstRetailPrice-asc',
  'variantInfo.firstRetailPrice-desc',
];

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
  const size = parseInt(limit, 10) > 500 ? 500 : parseInt(limit, 10);
  const adTrack = useContext(AdTrackContext);
  const variables = useMemo(() => {
    const [field, order] = String(
      SORT_FIELDS.includes(sort) ? sort : SORT_FIELDS[0],
    ).split('-');
    const output = {
      search: {
        size,
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
          not: [],
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
            .slice(parseInt(offset, 10), parseInt(offset, 10) + size),
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
          query: search.replace(/~/g, ''),
        },
        {
          type: 'query_string',
          fields: ['title.zh_TW'],
          query: search.replace(/~/g, ''),
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

      output.search.filter.not.push({
        type: 'exact',
        child: 'variant',
        field: 'status',
        query: '0',
      });
    }

    return output;
  }, [sort, size, offset, ids, search, tags, price, includedAllTags]);
  const prevVariables = usePrevious(variables);
  const { data, loading } = useQuery(getProducts, { variables });

  useEffect(() => {
    if (
      prevVariables &&
      data?.computeProductList?.data &&
      !areEqual(prevVariables, variables)
    ) {
      const dom = document.getElementById(id);

      setTimeout(() => {
        if (dom) dom.scrollIntoView({ behavior: 'smooth' });
      }, 500);

      if (search)
        adTrack.search({
          searchString: search,
          products: data.computeProductList.data,
        });
    }
  }, [id, adTrack, variables, data, search, prevVariables]);

  return {
    data: useMemo(() => {
      if (!data || !ids || sort !== 'selections') return data;

      const order = String(ids).split(',');

      // FIXME: custom sorting workaround
      return {
        ...data,
        computeProductList: {
          ...data.computeProductList,
          data: [...data.computeProductList.data].sort(
            (a, b) => order.indexOf(a.id) - order.indexOf(b.id),
          ),
        },
      };
    }, [data, ids, sort]),
    loading,
  };
};
