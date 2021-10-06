// typescript import
import { NextPage } from 'next';

// import
import React from 'react';
import { Radio, Badge } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { filter } from 'graphql-anywhere';

import Orders from '@admin/orders';
import { useTranslation } from '@meepshop/locales';

import useEcfitColumns from './hooks/useEcfitColumns';
import useInitVariables, { initVariables } from './hooks/useInitVariables';
import useUpdateCreateEcfitOrder from './hooks/useUpdateCreateEcfitOrder';

// graphql typescript
import {
  getEcfitList as getEcfitListType,
  getEcfitListVariables as getEcfitListVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { getEcfitList } from './gqls';
import { useUpdateCreateEciftOrderUserFragment } from './gqls/useUpdateCreateEcfitOrder';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
}

// definition
const { Group } = Radio;

const OrdersEcfit: NextPage<PropsType> = React.memo(() => {
  const { t } = useTranslation('orders-ecfit');
  const { data, loading, variables, fetchMore, refetch } = useQuery<
    getEcfitListType,
    getEcfitListVariablesType
  >(getEcfitList, {
    variables: initVariables,
    ssr: false,
    notifyOnNetworkStatusChange: true,
  });
  const sentFailedAmount = data?.viewer?.sentFailedList?.total || 0;

  const { runningIds, updateCreateEcfitOrder } = useUpdateCreateEcfitOrder({
    user: filter(useUpdateCreateEciftOrderUserFragment, data?.viewer || null),
    variables,
    fetchMore,
  });
  const getColumns = useEcfitColumns(variables);

  useInitVariables(variables || initVariables);

  return (
    <Orders
      pageId="ecfit"
      data={data}
      loading={loading}
      variables={variables}
      fetchMore={fetchMore}
      refetch={refetch}
      reset={() => {
        refetch({
          ...variables,
          filter: { ecfitSentStatus: variables.filter?.ecfitSentStatus },
        });
      }}
      getColumns={getColumns}
      runningIds={runningIds}
      submitOrders={updateCreateEcfitOrder}
      disabledSend={variables?.filter?.ecfitSentStatus === 'SENT_SUCCESSFUL'}
    >
      <Group
        value={variables?.filter?.ecfitSentStatus}
        onChange={({ target: { value } }) =>
          refetch({
            ...variables,
            filter: {
              ...variables.filter,
              ecfitSentStatus: value,
            },
          })
        }
      >
        {['NOT_SENT', 'SENT_SUCCESSFUL', 'SENT_FAILED'].map(key => (
          <Radio key={key} value={key}>
            {key !== 'SENT_FAILED' ? (
              t(`status.${key}`)
            ) : (
              <Badge dot={sentFailedAmount !== 0}>{t(`status.${key}`)}</Badge>
            )}
          </Radio>
        ))}
      </Group>
    </Orders>
  );
});

OrdersEcfit.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default OrdersEcfit;
