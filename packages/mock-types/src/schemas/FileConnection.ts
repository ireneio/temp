// import
import uuid from 'uuid/v4';

import mock from '../mock';

// graphql typescript
import {
  fileConnectionMockFragment,
  fileConnectionMockFragment_edges as fileConnectionMockFragmentEdges,
} from '@meepshop/types/gqls/meepshop';

// definition
const cache: fileConnectionMockFragmentEdges[] = [];
const MAX_TOTAL = 50;

export default mock.add<
  fileConnectionMockFragment,
  {},
  {
    first: number;
    after?: string;
  }
>('FileConnection', [
  (_, { first = 10, after }) => {
    const cacheIndex = !after
      ? 0
      : cache.findIndex(({ node: { id } }) => id === after);
    const edges: fileConnectionMockFragmentEdges[] = [];

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
        .map(() => ({
          __typename: 'FileEdge',
          node: {
            __typename: 'File',
            id: uuid(),
          },
        }));

      edges.push(...newEdges);
      cache.push(...newEdges);
    }

    return {
      __typename: 'FileConnection',
      edges,
      pageInfo: {
        __typename: 'PageInfo',
        endCursor: edges[edges.length - 1].node.id,
      },
      total: MAX_TOTAL,
    };
  },
]);
