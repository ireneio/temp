// typescript import
import { ColumnProps } from 'antd/lib/table';

// import
import React, { useMemo } from 'react';

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
): {
  ecpayColumn: ColumnProps<useEcpayColumnsFragmentEdgesType>;
  extraColumns: ColumnProps<useEcpayColumnsFragmentEdgesType>[];
} => {
  const { t } = useTranslation('orders-ecpay');

  return {
    ecpayColumn: useMemo(
      () => ({
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
        dataIndex: 'node.latestLogisticTracking.status',
        render: (value: OrderLogisticTrackingStatusEnum) =>
          t(`status.${value}`),
      }),
      [t],
    ),
    extraColumns: useMemo(
      () => [
        ...(!variables?.filter?.logisticTrackingStatus?.includes(
          'FAIL_TO_PLACE' as OrderLogisticTrackingStatusEnum,
        )
          ? []
          : [
              {
                title: t('reason'),
                dataIndex: 'node.latestLogisticTracking.providerStatusMessage',
                render: (
                  value: useEcpayColumnsFragmentEdgesNodeLatestLogisticTrackingType['providerStatusMessage'],
                  record: useEcpayColumnsFragmentEdgesType,
                ) => {
                  if (
                    record.node.latestLogisticTracking?.status !==
                    'FAIL_TO_PLACE'
                  )
                    return null;
                  return value || null;
                },
              },
            ]),
      ],
      [t, variables],
    ),
  };
};
