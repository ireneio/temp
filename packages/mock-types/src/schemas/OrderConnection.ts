// import
import { gql } from 'apollo-boost';
import uuid from 'uuid/v4';

import mock from '../mock';

// graphql typescript
import {
  OrderConnectionMock,
  OrderConnectionMock_edges as OrderConnectionMockEdges,
} from './__generated__/OrderConnectionMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment OrderConnectionMock on OrderConnection {
    edges {
      node {
        id
      }
    }
    pageInfo {
      endCursor
    }
    total
  }
`;

const cache: OrderConnectionMockEdges[] = [];
const MAX_TOTAL = 50;

export default mock.add<
  OrderConnectionMock,
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
    const edges: OrderConnectionMockEdges[] = [];

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
          node: {
            id: uuid(),
          },
        }));

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
