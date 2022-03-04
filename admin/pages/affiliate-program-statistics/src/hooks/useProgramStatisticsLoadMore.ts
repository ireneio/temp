// typescript import
import { QueryResult } from '@apollo/client';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

// graphql typescript
import {
  getAffiliateProgramStatistics as getAffiliateProgramStatisticsType,
  getAffiliateProgramStatisticsVariables as getAffiliateProgramStatisticsVariablesType,
  useProgramStatisticsLoadMoreFragment as useProgramStatisticsLoadMoreFragmentType,
  setAffiliateProgramStatisticsCurrent as setAffiliateProgramStatisticsCurrentType,
  setAffiliateProgramStatisticsCurrentVariables as setAffiliateProgramStatisticsCurrentVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { setAffiliateProgramStatisticsCurrent } from '../gqls/useProgramStatisticsLoadMore';

// typescript definition
export type loadMoreType = Pick<
  QueryResult<
    getAffiliateProgramStatisticsType,
    getAffiliateProgramStatisticsVariablesType
  >,
  'loading' | 'fetchMore'
>;

interface LoadMoreInfoType {
  current: number;
  onChange: (current: number) => void;
}

// definition
export default (
  affiliateProgramOrders: useProgramStatisticsLoadMoreFragmentType | null,
  { loading, fetchMore }: loadMoreType,
): LoadMoreInfoType => {
  const [setCurrent] = useMutation<
    setAffiliateProgramStatisticsCurrentType,
    setAffiliateProgramStatisticsCurrentVariablesType
  >(setAffiliateProgramStatisticsCurrent);
  const current = affiliateProgramOrders?.pageInfo.currentInfo.current || 0;

  return {
    current,
    onChange: useCallback(
      (newCurrent: number) => {
        if (loading || newCurrent === current || !affiliateProgramOrders)
          return;

        if (
          newCurrent < current ||
          Math.ceil(affiliateProgramOrders.edges.length / 10) - 1 > current
        ) {
          setCurrent({
            variables: {
              input: {
                pageId: 'affiliate-program-statistics',
                current: newCurrent,
              },
            },
          });
          return;
        }

        fetchMore({
          variables: {
            after: affiliateProgramOrders.pageInfo.endCursor,
          },
          updateQuery: (
            previousResult: getAffiliateProgramStatisticsType,
            {
              fetchMoreResult,
            }: { fetchMoreResult: getAffiliateProgramStatisticsType },
          ) =>
            !fetchMoreResult?.viewer?.affiliateProgramOrders
              ? previousResult
              : {
                  ...previousResult,
                  viewer: {
                    ...previousResult.viewer,
                    affiliateProgramOrders: {
                      ...previousResult.viewer?.affiliateProgramOrders,
                      edges: [
                        ...(previousResult.viewer?.affiliateProgramOrders
                          ?.edges || []),
                        ...fetchMoreResult.viewer.affiliateProgramOrders.edges,
                      ],
                      pageInfo: {
                        ...fetchMoreResult.viewer.affiliateProgramOrders
                          .pageInfo,
                        currentInfo: {
                          ...fetchMoreResult.viewer.affiliateProgramOrders
                            .pageInfo.currentInfo,
                          __typename: 'CurrentInfo',
                          current: newCurrent,
                        },
                      },
                      total:
                        fetchMoreResult.viewer.affiliateProgramOrders.total,
                    },
                  },
                },
        });
      },
      [affiliateProgramOrders, fetchMore, loading, setCurrent, current],
    ),
  };
};
