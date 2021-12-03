// import
import { useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';

// graphql typescript
import {
  getBills as getBillsType,
  getBillsVariables as getBillsVariablesType,
  setBillsCurrent as setBillsCurrentType,
  setBillsCurrentVariables as setBillsCurrentVariablesType,
  getBills_viewer_store as getBillsViewerStore,
} from '@meepshop/types/gqls/admin';

// graphql import
import { getBills, setBillsCurrent } from '../gqls/useGetBills';

// definition
export default (): {
  loading: boolean;
  store: getBillsViewerStore | null;
  current: number;
  changePage: (newCurrent: number) => void;
} => {
  const { loading, data, fetchMore } = useQuery<
    getBillsType,
    getBillsVariablesType
  >(getBills, { notifyOnNetworkStatusChange: true });

  const [setCurrent] = useMutation<
    setBillsCurrentType,
    setBillsCurrentVariablesType
  >(setBillsCurrent);

  const bills = data?.viewer?.store?.bills || null;
  const current = bills?.pageInfo.currentInfo.current || 0;

  return {
    loading,
    store: data?.viewer?.store || null,
    current,
    changePage: useCallback(
      (newCurrent: number): void => {
        if (loading || newCurrent === current || !bills) return;

        if (
          newCurrent < current ||
          Math.ceil(bills.edges.length / 10) - 1 > current
        ) {
          setCurrent({
            variables: {
              input: { pageId: 'bill-payment', current: newCurrent },
            },
          });
          return;
        }

        fetchMore({
          variables: {
            after: bills.pageInfo.endCursor,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult?.viewer?.store?.bills) return previousResult;

            return {
              ...previousResult,
              viewer: {
                ...previousResult.viewer,
                store: {
                  ...previousResult.viewer?.store,
                  bills: {
                    ...previousResult.viewer?.store?.bills,
                    edges: [
                      ...(previousResult.viewer?.store?.bills?.edges || []),
                      ...fetchMoreResult.viewer.store.bills.edges,
                    ],
                    pageInfo: {
                      ...fetchMoreResult.viewer.store.bills.pageInfo,
                      currentInfo: {
                        ...fetchMoreResult.viewer.store.bills.pageInfo
                          .currentInfo,
                        __typename: 'CurrentInfo',
                        current: newCurrent,
                      },
                    },
                    total: fetchMoreResult.viewer.store.bills.total,
                  },
                },
              },
            };
          },
        });
      },
      [loading, current, setCurrent, bills, fetchMore],
    ),
  };
};
