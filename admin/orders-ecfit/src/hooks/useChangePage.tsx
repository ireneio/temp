// typescript import
import { getEcfitListQueryPropsType } from '../constants';

// import
import { useCallback, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

// graphql typescript
import {
  setEcfitOrderCurrent as setEcfitOrderCurrentType,
  setEcfitOrderCurrentVariables as setEcfitOrderCurrentVariablesType,
} from '../gqls/__generated__/setEcfitOrderCurrent';
import { useChangePageFragment as useChangePageFragmentType } from '../gqls/__generated__/useChangePageFragment';

// graphql import
import { setEcfitOrderCurrent } from '../gqls/useChangePage';

// typescript definition
interface PropsType
  extends Pick<
    getEcfitListQueryPropsType,
    'variables' | 'fetchMore' | 'refetch'
  > {
  user: useChangePageFragmentType | null;
}

// definition
export default ({
  user,
  variables,
  fetchMore,
  refetch,
}: PropsType): {
  loading: boolean;
  changePage: (newCurrent: number, newPageSize: number) => void;
} => {
  const ecfitOrders = user?.ecfitOrders || null;
  const [loading, setLoading] = useState<boolean>(false);
  const [mutation] = useMutation<
    setEcfitOrderCurrentType,
    setEcfitOrderCurrentVariablesType
  >(setEcfitOrderCurrent);

  const changePage = useCallback(
    (newCurrent: number, newPageSize: number): void => {
      const { first: pageSize } = variables;

      if (newPageSize !== pageSize) {
        refetch({
          ...variables,
          first: newPageSize,
        });
        return;
      }

      if (!ecfitOrders) return;

      const {
        edges,
        pageInfo: {
          endCursor,
          currentInfo: { current, ...currentInfo },
        },
      } = ecfitOrders;

      if (loading || newCurrent === current) return;

      if (
        newCurrent < current ||
        Math.ceil(edges.length / pageSize) - 1 > current
      ) {
        mutation({
          variables: {
            input: { pageId: 'orders-ecfit', current: newCurrent },
          },
        });
      }

      setLoading(true);

      fetchMore({
        variables: {
          cursor: endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          setLoading(false);

          if ((fetchMoreResult?.viewer?.ecfitOrders?.edges || []).length > 0) {
            return {
              ...previousResult,
              viewer: {
                ...previousResult.viewer,
                ecfitOrders: {
                  __typename: 'OrderConnection',
                  edges: [
                    ...(previousResult?.viewer?.ecfitOrders?.edges || []),
                    ...(fetchMoreResult?.viewer?.ecfitOrders?.edges || []),
                  ],
                  pageInfo: {
                    ...fetchMoreResult?.viewer?.ecfitOrders?.pageInfo,
                    currentInfo: {
                      ...currentInfo,
                      __typename: 'CurrentInfo',
                      current: newCurrent,
                    },
                  },
                  total: fetchMoreResult?.viewer?.ecfitOrders?.total,
                },
              },
            };
          }
          return previousResult;
        },
      });
    },
    [loading, ecfitOrders, variables, mutation, fetchMore, refetch],
  );

  return { loading, changePage };
};
