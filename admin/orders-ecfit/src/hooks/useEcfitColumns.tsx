// typescript import
import { ColumnProps } from 'antd/lib/table';

// import
import React, { useMemo } from 'react';
import moment from 'moment';
import { Spin } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import Link from '@meepshop/link';

import { STATUS_LIST } from '../constants';

// graphql typescript
import {
  useEcfitColumnsFragment_edges as useEcfitColumnsFragmentEdgesType,
  useEcfitColumnsFragment_edges_node as useEcfitColumnsFragmentEdgesNodeType,
  useEcfitColumnsFragment_edges_node_lastEcfitRequestRecord as useEcfitColumnsFragmentEdgesNodeLastEcfitRequestRecordType,
  useEcfitColumnsFragment_edges_node_paymentInfo as useEcfitColumnsFragmentEdgesNodePaymentInfoType,
  useEcfitColumnsFragment_edges_node_shipmentInfo as useEcfitColumnsFragmentEdgesNodeShipmentInfoType,
  getEcfitListVariables,
} from '@meepshop/types/gqls/admin';

// definition
export default (
  variables: getEcfitListVariables,
): ColumnProps<useEcfitColumnsFragmentEdgesType>[] => {
  const { t } = useTranslation('orders-ecfit');

  return useMemo(
    () => [
      {
        title: t('orders.order-no'),
        dataIndex: 'node.orderNo',
        render: (
          value: useEcfitColumnsFragmentEdgesNodeType['orderNo'],
          // SHOULD_NOT_BE_NULL
          { node: { id } }: useEcfitColumnsFragmentEdgesType,
        ) => (
          <>
            <Spin />

            {!id ? (
              value
            ) : (
              <Link href={`/orders/${id}?ref=ecfit`}>
                <a href={`/orders/${id}?ref=ecfit`}>{value}</a>
              </Link>
            )}
          </>
        ),
      },
      {
        title: t('orders.shipment-name'),
        dataIndex: 'node.shipmentInfo.list[0].name',
      },
      {
        title: t('orders.payment-status'),
        dataIndex: 'node.paymentInfo.status',
        // SHOULD_NOT_BE_NULL
        render: (
          value: useEcfitColumnsFragmentEdgesNodePaymentInfoType['status'],
        ) =>
          value === null
            ? null
            : t(`paymentStatusList.${STATUS_LIST.paymentStatusList[value]}`),
      },
      {
        title: t('orders.shipment-status'),
        dataIndex: 'node.shipmentInfo.status',
        // SHOULD_NOT_BE_NULL
        render: (
          value: useEcfitColumnsFragmentEdgesNodeShipmentInfoType['status'],
        ) =>
          value === null
            ? null
            : t(`shipmentStatusList.${STATUS_LIST.shipmentStatusList[value]}`),
      },
      {
        title: t('orders.order-status'),
        dataIndex: 'node.status',
        // SHOULD_NOT_BE_NULL
        render: (value: useEcfitColumnsFragmentEdgesNodeType['status']) =>
          value === null
            ? null
            : t(`orderStatusList.${STATUS_LIST.orderStatusList[value]}`),
      },
      {
        title: t('orders.recipient'),
        dataIndex: 'node.shipmentInfo.list[0].recipient.name',
      },
      {
        title: t('orders.amount'),
        dataIndex: 'node.priceInfo.total',
      },
      {
        title: t('orders.create-at'),
        dataIndex: 'node.createdAt',
        render: (value: useEcfitColumnsFragmentEdgesNodeType['createdAt']) =>
          !value ? null : moment(value).format('YYYY/MM/DD HH:mm:ss'),
      },
      ...(variables?.filter?.ecfitSentStatus !== 'SENT_SUCCESSFUL'
        ? []
        : [
            {
              title: t('orders.send-time'),
              dataIndex: 'node.lastEcfitRequestRecord.createdAt',
              render: (
                value: useEcfitColumnsFragmentEdgesNodeLastEcfitRequestRecordType['createdAt'],
              ) =>
                !value ? null : moment(value).format('YYYY/MM/DD HH:mm:ss'),
            },
          ]),
      ...(variables?.filter?.ecfitSentStatus !== 'SENT_FAILED'
        ? []
        : [
            {
              title: t('orders.fail-reason'),
              dataIndex: 'node.lastEcfitRequestRecord.response',
              render: (
                value: useEcfitColumnsFragmentEdgesNodeLastEcfitRequestRecordType['response'],
              ) => (!value ? null : t(`fail-reason.${value}`)),
            },
          ]),
    ],
    [t, variables],
  );
};
