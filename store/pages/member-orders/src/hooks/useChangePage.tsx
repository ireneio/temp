// typescript import
import { QueryResult } from '@apollo/react-common';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';

// graphql typescript
import {
  getOrders,
  getOrdersVariables,
  setOrdersCurrent as setOrdersCurrentType,
  setOrdersCurrentVariables as setOrdersCurrentVariablesType,
  changePageFragment as changePageFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import { setOrdersCurrent } from '../gqls/useChangePage';

// definition
export default (
  data: changePageFragmentType | null,
  fetchMore: QueryResult<getOrders, getOrdersVariables>['fetchMore'],
  first: number,
): ((newCurrent: number) => void) => {
  const [setCurrent] = useMutation<
    setOrdersCurrentType,
    setOrdersCurrentVariablesType
  >(setOrdersCurrent);

  return useCallback(
    (newCurrent: number): void => {
      if (!data) return;

      const {
        endCursor,
        currentInfo: { current },
      } = data.pageInfo;

      if (newCurrent === current) return;

      if (
        newCurrent < current ||
        Math.ceil(data.edges.length / first) - 1 > current
      ) {
        setCurrent({
          variables: {
            input: { pageId: 'member-orders', current: newCurrent },
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
                        ...fetchMoreResult?.viewer?.orders?.pageInfo
                          ?.currentInfo,
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
    [data, setCurrent, first, fetchMore],
  );
};
