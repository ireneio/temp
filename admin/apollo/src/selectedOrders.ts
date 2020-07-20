// typescript import
import { ContextType } from '@meepshop/apollo';

// import
import gql from 'graphql-tag';
import moment from 'moment';

// graphql typescript
import { SetOrdersToSelectedOrdersInput } from '../../../__generated__/admin';

import { initializeSelectedOrders } from './__generated__/initializeSelectedOrders';

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

export const initializeCache = (cache: ContextType['cache']): void => {
  // TODO: remove after orderlist move to next-admin
  if (
    typeof window !== 'undefined' &&
    moment().diff(
      moment(localStorage.getItem('selectedOrders-timeout') || undefined),
      'minutes',
      true,
    ) > 1
  )
    localStorage.removeItem('selectedOrders');

  const selectedOrders: string[] =
    typeof window === 'undefined'
      ? []
      : JSON.parse(localStorage.getItem('selectedOrders') || '[]');

  cache.writeQuery<initializeSelectedOrders>({
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
        pageInfo: {
          ...pageInfo,
          __typename: 'PageInfo',
        },
        total: selectedOrders.length,
      },
    },
  });
};

export const resolvers = {
  Mutation: {
    setOrdersToSelectedOrders: (
      _: unknown,
      { input: { ids } }: { input: SetOrdersToSelectedOrdersInput },
      { cache }: ContextType,
    ) => {
      cache.writeQuery<initializeSelectedOrders>({
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
            pageInfo: {
              ...pageInfo,
              __typename: 'PageInfo',
            },
            total: ids.length,
          },
        },
      });

      // TODO: remove after orderlist move to next-admin
      if (typeof window !== 'undefined') {
        localStorage.setItem('selectedOrders', JSON.stringify(ids));
        localStorage.setItem('selectedOrders-timeout', moment().format());
      }

      return true;
    },
  },
};
