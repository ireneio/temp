// typescript import
import { ColumnProps } from 'antd/lib/table';

// import
import React, { useCallback } from 'react';

import Tooltip from '@admin/tooltip';
import { useTranslation } from '@meepshop/locales';

import styles from '../styles/useEcpayColumn.less';

// graphql typescript
import {
  useEcpayColumnsFragment_edges as useEcpayColumnsFragmentEdgesType,
  useEcpayColumnsFragment_edges_node_latestLogisticTracking as useEcpayColumnsFragmentEdgesNodeLatestLogisticTrackingType,
  getEcpayListVariables,
  OrderLogisticTrackingStatusEnum,
} from '@meepshop/types/gqls/admin';

// definition
export default (
  variables: getEcpayListVariables,
): ((
  columns: ColumnProps<useEcpayColumnsFragmentEdgesType>[],
) => ColumnProps<useEcpayColumnsFragmentEdgesType>[]) => {
  const { t } = useTranslation('orders-ecpay');

  return useCallback(
    columns => [
      ...columns.slice(0, 2),
      {
        title: (
          <>
            {t('logistic-status')}
            <Tooltip
              title={t('logistic-status-tip')}
              overlayClassName={styles.overlay}
              iconClassName={styles.icon}
            />
          </>
        ),
        dataIndex: ['node', 'latestLogisticTracking', 'status'],
        render: (value: OrderLogisticTrackingStatusEnum) =>
          t(`status.${value}`),
      },
      ...columns.slice(2),
      ...(!variables?.filter?.logisticTrackingStatus?.includes(
        'FAIL_TO_PLACE' as OrderLogisticTrackingStatusEnum,
      )
        ? []
        : [
            {
              title: t('reason'),
              dataIndex: [
                'node',
                'latestLogisticTracking',
                'providerStatusMessage',
              ],
              render: (
                value: useEcpayColumnsFragmentEdgesNodeLatestLogisticTrackingType['providerStatusMessage'],
                record: useEcpayColumnsFragmentEdgesType,
              ) =>
                record.node.latestLogisticTracking?.status !== 'FAIL_TO_PLACE'
                  ? null
                  : value || null,
            },
          ]),
    ],
    [t, variables],
  );
};
