// typescript import
import { getEcfitListQueryPropsType } from '../constants';

// import
import { useCallback, useState, useEffect } from 'react';
import { Modal } from 'antd';
import Router from 'next/router';
import { useMutation, useApolloClient } from '@apollo/react-hooks';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import {
  createEcfitOrder as createEcfitOrderType,
  createEcfitOrderVariables as createEcfitOrderVariablesType,
} from '../gqls/__generated__/createEcfitOrder';
import { useUpdateCreateEcfitOrdersOrderConnectionFragment as useUpdateCreateEcfitOrdersOrderConnectionFragmentType } from '../gqls/__generated__/useUpdateCreateEcfitOrdersOrderConnectionFragment';
import { useUpdateCreateEciftOrderFragment as useUpdateCreateEciftOrderFragmentType } from '../gqls/__generated__/useUpdateCreateEciftOrderFragment';
import { useUpdateCreateEcfitOrdersStoreFragment as useUpdateCreateEcfitOrdersStoreFragmentType } from '../gqls/__generated__/useUpdateCreateEcfitOrdersStoreFragment';

// graphql import
import {
  createEcfitOrder,
  useUpdateCreateEcfitOrdersStoreFragment,
} from '../gqls/useUpdateCreateEcfitOrder';

// typescript definition
interface PropsType
  extends Pick<getEcfitListQueryPropsType, 'variables' | 'fetchMore'> {
  user: useUpdateCreateEciftOrderFragmentType | null;
  selectedOrders: useUpdateCreateEcfitOrdersOrderConnectionFragmentType | null;
}

export default ({
  user,
  variables,
  selectedOrders,
  fetchMore,
}: PropsType): {
  runningIds: string[];
  updateCreateEcfitOrder: () => Promise<void>;
} => {
  const isEnabled = user?.store?.storeEcfitSettings?.isEnabled;
  const ecfitOrders = user?.ecfitOrders || null;
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

  const updateCreateEcfitOrder = useCallback(async () => {
    if (!selectedOrders || !ecfitOrders) return;

    const ecfitSentStatus = variables?.filter?.ecfitSentStatus;
    // SHOULD_NOT_BE_NULL
    const selectedIds = selectedOrders.edges.map(
      ({ node: { id } }) => id || 'null-id',
    );
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
        ['FAIL_ECFIT_NOT_ENABLED', 'FAIL_ECFIT_NOT_AUTHORIZED'].includes(status)
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
    } = ecfitOrders;

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
            ecfitOrders: {
              __typename: 'OrderConnection',
              edges: [
                ...(previousResult?.viewer.ecfitOrders?.edges || []).filter(
                  ({ node: { id } }) =>
                    !successIds.includes(
                      id || 'null id' /** SHOULD_NOT_BE_NULL */,
                    ),
                ),
                ...(fetchMoreResult?.viewer?.ecfitOrders?.edges || []),
              ],
              pageInfo: fetchMoreResult?.viewer?.ecfitOrders?.pageInfo,
              total: fetchMoreResult?.viewer?.ecfitOrders?.total,
            },
          },
          selectedOrders: {
            ...previousResult.selectedOrders,
            edges: previousResult.selectedOrders.edges.filter(
              ({ node: { id } }) => !successIds.includes(id as string),
            ),
          },
        };
      },
    });

    setRunningIds([]);
  }, [
    mutation,
    storeId,
    client,
    isEnabled,
    variables,
    selectedOrders,
    ecfitOrders,
    fetchMore,
  ]);

  return { runningIds, updateCreateEcfitOrder };
};
