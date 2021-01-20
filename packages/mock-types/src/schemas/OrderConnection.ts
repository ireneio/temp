// import
import uuid from 'uuid/v4';

import mock from '../mock';

// graphql typescript
import {
  orderConnectionMockFragment,
  orderConnectionMockFragment_edges as orderConnectionMockFragmentEdges,
} from '@meepshop/types/gqls/meepshop';

// definition
const cache: orderConnectionMockFragmentEdges[] = [];
const MAX_TOTAL = 50;

export default mock.add<
  orderConnectionMockFragment,
  {},
  {
    first: number;
    after?: string;
  }
>('OrderConnection', [
  (_, { first = 10, after }) => {
    const cacheIndex = !after
      ? 0
      : cache.findIndex(({ node: { id } }) => id === after);
    const edges: orderConnectionMockFragmentEdges[] = [];

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
                __typename: 'OrderEdge',
                node: {
                  __typename: 'Order',
                  id: 'order-id',
                },
              }
            : {
                __typename: 'OrderEdge',
                node: {
                  __typename: 'Order',
                  id: uuid(),
                },
              },
        );

      edges.push(...newEdges);
      cache.push(...newEdges);
    }

    return {
      __typename: 'OrderConnection',
      edges,
      pageInfo: {
        __typename: 'PageInfo',
        endCursor: edges[edges.length - 1].node.id,
      },
      total: MAX_TOTAL,
    };
  },
]);
