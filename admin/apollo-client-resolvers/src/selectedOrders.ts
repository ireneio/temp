// typescript import
import { InMemoryCache } from 'apollo-boost';

import { ContextType } from './constants';

// import
import { gql } from 'apollo-boost';
import moment from 'moment';

// graphql typescript
import { SetOrdersToSelectedOrdersInput } from '../../../__generated__/admin';

// definition
const query = gql`
  query initializeSelectedOrders {
    selectedOrders @client {
      edges {
        node {
          id
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      total
    }
  }
`;

const pageInfo = {
  __typename: 'PageInfo',
  hasNextPage: false,
  hasPreviousPage: false,
  startCursor: null,
  endCursor: null,
};

export const initializeCache = (cache: InMemoryCache): void => {
  // TODO: remove after orderlist move to next-admin
  if (
    process.browser &&
    moment().diff(
      moment(localStorage.getItem('selectedOrders-timeout') || undefined),
      'minutes',
      true,
    ) > 1
  )
    localStorage.removeItem('selectedOrders');

  const selectedOrders: string[] = !process.browser
    ? []
    : JSON.parse(localStorage.getItem('selectedOrders') || '[]');

  cache.writeQuery({
    query,
    data: {
      selectedOrders: {
        __typename: 'OrderConnection',
        edges: selectedOrders.map(id => ({
          __typename: 'OrderEdge',
          node: {
            __typename: 'Order',
            id,
          },
        })),
        pageInfo,
        total: selectedOrders.length,
      },
    },
  });
};

export const resolver = {
  Query: {},
  Mutation: {
    setOrdersToSelectedOrders: (
      _: unknown,
      { input: { ids } }: { input: SetOrdersToSelectedOrdersInput },
      { cache }: ContextType,
    ) => {
      cache.writeQuery({
        query,
        data: {
          selectedOrders: {
            __typename: 'OrderConnection',
            edges: ids.map(id => ({
              __typename: 'OrderEdge',
              node: {
                __typename: 'Order',
                id,
              },
            })),
            pageInfo,
            total: ids.length,
          },
        },
      });

      // TODO: remove after orderlist move to next-admin
      if (process.browser) {
        localStorage.setItem('selectedOrders', JSON.stringify(ids));
        localStorage.setItem('selectedOrders-timeout', moment().format());
      }

      return true;
    },
  },
};
