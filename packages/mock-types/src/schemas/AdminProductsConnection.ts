// import
import uuid from 'uuid/v4';

import mock from '../mock';

// graphql typescript
import {
  adminProductsConnectionMockFragment,
  adminProductsConnectionMockFragment_edges as adminProductsConnectionMockFragmentEdges,
} from '@meepshop/types/gqls/meepshop';

// definition
const cache: adminProductsConnectionMockFragmentEdges[] = [];
const MAX_TOTAL = 50;

export default mock.add<
  adminProductsConnectionMockFragment,
  {},
  {
    first: number;
    after?: string;
  }
>('AdminProductsConnection', [
  (_, { first = 10, after }) => {
    const cacheIndex = !after
      ? 0
      : cache.findIndex(({ node: { id } }) => id === after);
    const edges: adminProductsConnectionMockFragmentEdges[] = [];

    if (cacheIndex !== -1 && cacheIndex + 1 <= cache.length - 1)
      edges.push(...cache.slice(cacheIndex, cacheIndex + first));
    else {
      const newEdges = [].constructor
        .apply(
          {},
          new Array(
            cache.length + first > MAX_TOTAL ? MAX_TOTAL - cache.length : first,
          ),
        )
        .map((__: undefined, index: number) =>
          cache.length === 0 && index === 0
            ? {
                __typename: 'AdminProductEdge',
                node: {
                  __typename: 'Product',
                  id: 'order-id',
                },
              }
            : {
                __typename: 'AdminProductEdge',
                node: {
                  __typename: 'Product',
                  id: uuid(),
                },
              },
        );

      edges.push(...newEdges);
      cache.push(...newEdges);
    }

    return {
      __typename: 'AdminProductsConnection',
      edges,
      pageInfo: {
        __typename: 'PageInfo',
        endCursor: edges[edges.length - 1].node.id,
      },
      total: MAX_TOTAL,
    };
  },
]);
