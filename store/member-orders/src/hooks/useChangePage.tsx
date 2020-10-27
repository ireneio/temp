// typescript import
import { QueryResult } from '@apollo/react-common';

// import
import { useCallback, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

// graphql typescript
import { getOrders, getOrdersVariables } from '../gqls/__generated__/getOrders';
import {
  setOrdersCurrent as setOrdersCurrentType,
  setOrdersCurrentVariables as setOrdersCurrentVariablesType,
} from '../gqls/__generated__/setOrdersCurrent';
import { changePageFragment as changePageFragmentType } from '../gqls/__generated__/changePageFragment';

// graphql import
import { setOrdersCurrent } from '../gqls/useChangePage';

// definition
export default (
  data: changePageFragmentType | null,
  fetchMore: QueryResult<getOrders, getOrdersVariables>['fetchMore'],
  first: number,
): {
  loading: boolean;
  changePage: (newCurrent: number) => void;
} => {
  const [loading, setLoading] = useState<boolean>(false);
  const [setCurrent] = useMutation<
    setOrdersCurrentType,
    setOrdersCurrentVariablesType
  >(setOrdersCurrent);

  const changePage = useCallback(
    (newCurrent: number): void => {
      if (!data) return;

      const {
        endCursor,
        currentInfo: { current },
      } = data.pageInfo;
      if (loading || newCurrent === current) return;

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
      setLoading(true);

      fetchMore({
        variables: {
          cursor: endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          setLoading(false);
          if ((fetchMoreResult?.viewer?.orders?.edges || []).length > 0)
            return {
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
                      ...fetchMoreResult?.viewer?.orders?.pageInfo?.currentInfo,
                      __typename: 'CurrentInfo',
                      current: newCurrent,
                    },
                  },
                  total: fetchMoreResult?.viewer?.orders?.total,
                },
              },
            };

          return previousResult;
        },
      });
    },
    [data, setCurrent, loading, first, fetchMore],
  );

  return { loading, changePage };
};
