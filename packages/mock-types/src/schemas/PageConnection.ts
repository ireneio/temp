// import
import uuid from 'uuid/v4';

import mock from '../mock';

// graphql typescript
import {
  pageConnectionMockFragment,
  pageConnectionMockFragment_edges as pageConnectionMockFragmentEdges,
} from './gqls/__generated__/pageConnectionMockFragment';

// definition
const cache: {
  [key: string]: pageConnectionMockFragmentEdges[];
} = {};
const MAX_TOTAL = 50;

export default mock.add<
  pageConnectionMockFragment,
  {},
  {
    first: number;
    after?: string;
    filter?: { type: 'HOME' | 'TEMPLATE' | 'PRODUCT' | 'CUSTOM' | 'PRODUCTS' };
  }
>('PageConnection', [
  (__, { first = 10, after, filter }) => {
    if (!cache[filter?.type || 'HOME']) cache[filter?.type || 'HOEME'] = [];

    const typeCache = cache[filter?.type || 'HOME'];
    const cacheIndex = !after
      ? 0
      : typeCache.findIndex(({ node: { id } }) => id === after);
    const edges: pageConnectionMockFragmentEdges[] = [];

    if (cacheIndex !== -1 && cacheIndex + 1 <= typeCache.length - 1)
      edges.push(...typeCache.slice(cacheIndex, cacheIndex + first));
    else {
      const newEdges = [].constructor
        .apply(
          {},
          new Array(
            typeCache.length + first > MAX_TOTAL
              ? MAX_TOTAL - typeCache.length
              : first,
          ),
        )
        .map((___: undefined, index: number) =>
          typeCache.length === 0 && index === 0
            ? {
                __typename: 'PageEdge',
                node: {
                  __typename: 'Page',
                  id: `${filter?.type.toLowerCase() || 'home'}-page-id`,
                },
              }
            : {
                __typename: 'PageEdge',
                node: {
                  __typename: 'Page',
                  id: uuid(),
                },
              },
        )
        .map((data: pageConnectionMockFragmentEdges) => ({
          ...data,
          node: {
            ...data.node,
            pageType: filter?.type.toLowerCase() || 'home',
          },
        }));

      edges.push(...newEdges);
      typeCache.push(...newEdges);
    }

    return {
      __typename: 'PageConnection',
      edges,
      pageInfo: {
        __typename: 'PageInfo',
        endCursor: edges[edges.length - 1].node.id,
      },
      total: MAX_TOTAL,
    };
  },
]);
