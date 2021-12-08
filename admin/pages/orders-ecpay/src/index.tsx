// typescript import
import { NextPage } from 'next';

// import
import React from 'react';
import { useQuery } from '@apollo/client';
import { Checkbox } from 'antd';

import Orders from '@admin/orders';
import { useTranslation } from '@meepshop/locales';

import useInitVariables, { initVariables } from './hooks/useInitVariables';
import useEcpayColumns from './hooks/useEcpayColumns';
import useSubmitEcpayOrder from './hooks/useSubmitEcpayOrder';
import styles from './styles/index.less';

// graphql typescript
import {
  getEcpayList as getEcpayListType,
  getEcpayListVariables as getEcpayListVariablesType,
  OrderLogisticTrackingStatusEnum,
} from '@meepshop/types/gqls/admin';

// graphql import
import { getEcpayList } from './gqls';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
}

// definition
const { Group } = Checkbox;

const OrdersEcpay: NextPage<PropsType> = React.memo(() => {
  const { t } = useTranslation('orders-ecpay');
  const { data, loading, variables, fetchMore, refetch } = useQuery<
    getEcpayListType,
    getEcpayListVariablesType
  >(getEcpayList, {
    variables: initVariables,
    ssr: false,
    notifyOnNetworkStatusChange: true,
  });
  const getColumns = useEcpayColumns(variables);
  const { runningIds, submitEcpayOrder } = useSubmitEcpayOrder();

  useInitVariables(variables || initVariables);

  return (
    <Orders
      pageId="ecpay"
      data={data}
      loading={loading}
      variables={variables}
      fetchMore={fetchMore}
      refetch={refetch}
      reset={() => {
        refetch({
          ...variables,
          filter: {
            logisticTrackingStatus: variables?.filter?.logisticTrackingStatus,
          },
        });
      }}
      getColumns={getColumns}
      runningIds={runningIds}
      submitOrders={submitEcpayOrder}
    >
      <Group
        className={styles.status}
        value={variables?.filter?.logisticTrackingStatus as string[]}
        onChange={checkedValue => {
          if (checkedValue.length < 1) return;
          refetch({
            ...variables,
            filter: {
              ...variables?.filter,
              logisticTrackingStatus: checkedValue as OrderLogisticTrackingStatusEnum[],
            },
          });
        }}
      >
        {['PROCESSING', 'MANUAL_PROCESSING', 'PLACING', 'FAIL_TO_PLACE'].map(
          key => (
            <Checkbox key={key} value={key}>
              {t(`status.${key}`)}
            </Checkbox>
          ),
        )}
      </Group>
    </Orders>
  );
});

OrdersEcpay.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default OrdersEcpay;
