// typescript import
import { NextPage } from 'next';

// import
import React from 'react';
import { Radio, Badge } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { filter } from 'graphql-anywhere';

import Orders from '@admin/orders';
import { useTranslation } from '@meepshop/utils/lib/i18n';

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
import {
  useUpdateCreateEciftOrderFragment,
  useUpdateCreateEcfitOrdersOrderConnectionFragment,
} from './gqls/useUpdateCreateEcfitOrder';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
}

// definition
const { Group } = Radio;

const OrdersEcfit: NextPage<PropsType> = React.memo(() => {
  const { t } = useTranslation('orders-ecfit');
  const { data, variables, fetchMore, refetch } = useQuery<
    getEcfitListType,
    getEcfitListVariablesType
  >(getEcfitList, {
    variables: initVariables,
    ssr: false,
  });
  const selectedOrders = data?.selectedOrders || null;
  const sentFailedAmount = data?.viewer?.sentFailedList?.total || 0;

  const { runningIds, updateCreateEcfitOrder } = useUpdateCreateEcfitOrder({
    user: filter(useUpdateCreateEciftOrderFragment, data?.viewer || null),
    variables,
    fetchMore,
    selectedOrders: filter(
      useUpdateCreateEcfitOrdersOrderConnectionFragment,
      selectedOrders,
    ),
  });
  const columns = useEcfitColumns(variables);

  useInitVariables(initVariables);

  return (
    <Orders
      title={t('title')}
      service={t('service')}
      data={data}
      variables={variables}
      fetchMore={fetchMore}
      refetch={refetch}
      columns={columns}
      runningIds={runningIds}
      submitOrders={updateCreateEcfitOrder}
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
  namespacesRequired: [
    'orders-ecfit',
    'orders',
    'date-picker',
    'orders-export',
  ],
});

export default OrdersEcfit;
