// import
import gql from 'graphql-tag';
import uuid from 'uuid/v4';

import mock from '../mock';

// graphql typescript
import {
  FileConnectionMock,
  FileConnectionMock_edges as FileConnectionMockEdges,
} from './__generated__/FileConnectionMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment FileConnectionMock on FileConnection {
    edges {
      node {
        id
        image
      }
    }
    pageInfo {
      endCursor
    }
    total
  }
`;

const cache: FileConnectionMockEdges[] = [];
const MAX_TOTAL = 50;

export default mock.add<
  FileConnectionMock,
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
    const edges: FileConnectionMockEdges[] = [];

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
            image:
              'res.cloudinary.com/cakeresume/image/upload/s--Lv6sj1oB--/c_pad,fl_png8,h_200,w_200/v1509504375/pcotebjqdkfuqbvbt4xc.png',
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
