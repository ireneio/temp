// typescript import
import { QueryResult } from '@apollo/react-common';

// import
import { useCallback, useState, useEffect } from 'react';
import { Modal } from 'antd';
import Router from 'next/router';
import { useMutation, useApolloClient } from '@apollo/react-hooks';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  createEcfitOrder as createEcfitOrderType,
  createEcfitOrderVariables as createEcfitOrderVariablesType,
  useUpdateCreateEciftOrderUserFragment as useUpdateCreateEciftOrderUserFragmentFragmentType,
  useUpdateCreateEcfitOrdersStoreFragment as useUpdateCreateEcfitOrdersStoreFragmentType,
  getEcfitList,
  getEcfitListVariables,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  createEcfitOrder,
  useUpdateCreateEcfitOrdersStoreFragment,
} from '../gqls/useUpdateCreateEcfitOrder';

// typescript definition
interface PropsType
  extends Pick<
    QueryResult<getEcfitList, getEcfitListVariables>,
    'variables' | 'fetchMore'
  > {
  user: useUpdateCreateEciftOrderUserFragmentFragmentType | null;
}

export default ({
  user,
  variables,
  fetchMore,
}: PropsType): {
  runningIds: string[];
  updateCreateEcfitOrder: (selectedIds: string[]) => Promise<void>;
} => {
  const isEnabled = user?.store?.storeEcfitSettings?.isEnabled;
  const orders = user?.orders;
  const storeId = user?.store?.id || '';

  const [runningIds, setRunningIds] = useState<string[]>([]);

  const { t } = useTranslation('orders-ecfit');
  const client = useApolloClient();

  const [mutation] = useMutation<
    createEcfitOrderType,
    createEcfitOrderVariablesType
  >(createEcfitOrder);

  useEffect(() => {
    if (isEnabled === false)
      Modal.error({
        title: t('send-error.title'),
        content: t('send-error.content'),
        okText: t('send-error.confirm'),
        onOk: () => Router.push('/store-setting'),
      });
  }, [isEnabled, t]);

  const updateCreateEcfitOrder = useCallback(
    async (selectedIds: string[]) => {
      if (!orders) return;

      const ecfitSentStatus = variables?.filter?.ecfitSentStatus;
      // SHOULD_NOT_BE_NULL
      let isFail = false;

      setRunningIds(selectedIds);

      const successIds = (
        await Promise.all(
          selectedIds.map(orderId =>
            mutation({
              variables: {
                input: { orderId },
              },
            }),
          ),
        )
      ).reduce((result, response, index) => {
        const status = response?.data?.createEcfitOrder.status;

        if (!status) return result;

        if (
          isEnabled &&
          ['FAIL_ECFIT_NOT_ENABLED', 'FAIL_ECFIT_NOT_AUTHORIZED'].includes(
            status,
          )
        )
          isFail = true;

        if (
          ecfitSentStatus === 'NOT_SENT' ||
          (ecfitSentStatus === 'SENT_FAILED' && status === 'OK')
        )
          return [...result, selectedIds[index]];

        return result;
      }, []);

      if (isFail) {
        client.writeFragment<useUpdateCreateEcfitOrdersStoreFragmentType>({
          id: storeId,
          fragment: useUpdateCreateEcfitOrdersStoreFragment,
          data: {
            __typename: 'Store',
            id: storeId,
            storeEcfitSettings: {
              __typename: 'StoreEcfitSettings',
              isEnabled: false,
            },
          },
        });

        return;
      }

      if (successIds.length === 0) {
        setRunningIds([]);
      }

      const {
        pageInfo: { endCursor },
      } = orders;

      await fetchMore({
        variables: {
          cursor: endCursor,
          first: successIds.length,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!previousResult.viewer) return previousResult;

          return {
            ...previousResult,
            viewer: {
              ...previousResult.viewer,
              orders: {
                __typename: 'OrderConnection',
                edges: [
                  ...(previousResult?.viewer.orders?.edges || []).filter(
                    ({ node: { id } }) =>
                      !successIds.includes(
                        id || 'null id' /** SHOULD_NOT_BE_NULL */,
                      ),
                  ),
                  ...(fetchMoreResult?.viewer?.orders?.edges || []),
                ],
                pageInfo: fetchMoreResult?.viewer?.orders?.pageInfo,
                total: fetchMoreResult?.viewer?.orders?.total,
              },
            },
          };
        },
      });

      setRunningIds([]);
    },
    [mutation, storeId, client, isEnabled, variables, orders, fetchMore],
  );

  return { runningIds, updateCreateEcfitOrder };
};
