// typescript import
import { OrdersQueryResult } from '../constants';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

// graphql typescript
import {
  setOrderCurrent as setOrderCurrentType,
  setOrderCurrentVariables as setOrderCurrentVariablesType,
  useChangePageFragment as useChangePageFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { setOrderCurrent } from '../gqls/useChangePage';

// typescript definition
interface PropsType
  extends Pick<OrdersQueryResult, 'variables' | 'fetchMore' | 'refetch'> {
  user?: useChangePageFragmentType | null;
  pageId: string;
}

// definition
export default ({
  user,
  variables,
  fetchMore,
  refetch,
  pageId,
}: PropsType): ((newCurrent: number, newPageSize: number) => void) => {
  const orders = user?.orders || null;
  const [mutation] = useMutation<
    setOrderCurrentType,
    setOrderCurrentVariablesType
  >(setOrderCurrent);

  return useCallback(
    (newCurrent: number, newPageSize: number): void => {
      const pageSize = variables?.first;

      if (newPageSize !== pageSize) {
        refetch({
          ...variables,
          first: newPageSize,
        });
        return;
      }

      if (!orders) return;

      const {
        edges,
        pageInfo: {
          endCursor,
          currentInfo: { current, ...currentInfo },
        },
      } = orders;

      if (newCurrent === current) return;

      if (
        newCurrent < current ||
        Math.ceil(edges.length / pageSize) - 1 > current
      ) {
        mutation({
          variables: {
            input: { pageId, current: newCurrent },
          },
        });
        return;
      }

      fetchMore({
        variables: {
          cursor: endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) =>
          (fetchMoreResult?.viewer?.orders?.edges || []).length === 0
            ? previousResult
            : {
                ...previousResult,
                viewer: {
                  ...previousResult.viewer,
                  orders: {
                    __typename: 'OrderConnection',
                    edges: [
                      ...(previousResult?.viewer?.orders?.edges || []),
                      ...(fetchMoreResult?.viewer?.orders?.edges || []),
                    ],
                    pageInfo: {
                      ...fetchMoreResult?.viewer?.orders?.pageInfo,
                      currentInfo: {
                        ...currentInfo,
                        __typename: 'CurrentInfo',
                        current: newCurrent,
                      },
                    },
                    total: fetchMoreResult?.viewer?.orders?.total,
                  },
                },
              },
      });
    },
    [variables, orders, fetchMore, refetch, mutation, pageId],
  );
};
