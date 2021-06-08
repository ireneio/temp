// typescript import
import { ColumnProps } from 'antd/lib/table';

// import
import React, { useMemo } from 'react';
import moment from 'moment';
import { Spin } from 'antd';

import { useTranslation } from '@meepshop/locales';
import Link from '@meepshop/link';

import { STATUS_LIST } from '../constants';

// graphql typescript
import {
  useOrdersColumnsFragment_edges as useOrdersColumnsFragmentEdgesType,
  useOrdersColumnsFragment_edges_node as useOrdersColumnsFragmentEdgesNodeType,
  useOrdersColumnsFragment_edges_node_paymentInfo as useOrdersColumnsFragmentEdgesNodePaymentInfoType,
  useOrdersColumnsFragment_edges_node_shipmentInfo as useOrdersColumnsFragmentEdgesNodeShipmentInfoType,
} from '@meepshop/types/gqls/admin';

// definition
export default (
  pageId: string,
  extraColumns?: ColumnProps<unknown>[],
  ecpayColumn?: ColumnProps<unknown>,
): ColumnProps<useOrdersColumnsFragmentEdgesType>[] => {
  const { t } = useTranslation('orders');

  return useMemo(
    () => [
      {
        title: t('orders.order-no'),
        dataIndex: 'node.orderNo',
        render: (
          value: useOrdersColumnsFragmentEdgesNodeType['orderNo'],
          // SHOULD_NOT_BE_NULL
          { node: { id } }: useOrdersColumnsFragmentEdgesType,
        ) => (
          <>
            <Spin />

            {!id ? (
              value
            ) : (
              <Link href={`/orders/${id}?ref=${pageId}`}>
                <a href={`/orders/${id}?ref=${pageId}`}>{value}</a>
              </Link>
            )}
          </>
        ),
      },
      {
        title: t('orders.shipment-name'),
        dataIndex: 'node.shipmentInfo.list[0].name',
      },
      ...(ecpayColumn ? [ecpayColumn] : []),
      {
        title: t('orders.shipment-status'),
        dataIndex: 'node.shipmentInfo.status',
        // SHOULD_NOT_BE_NULL
        render: (
          value: useOrdersColumnsFragmentEdgesNodeShipmentInfoType['status'],
        ) =>
          value === null
            ? null
            : t(`shipmentStatusList.${STATUS_LIST.shipmentStatusList[value]}`),
      },
      {
        title: t('orders.payment-status'),
        dataIndex: 'node.paymentInfo.status',
        // SHOULD_NOT_BE_NULL
        render: (
          value: useOrdersColumnsFragmentEdgesNodePaymentInfoType['status'],
        ) =>
          value === null
            ? null
            : t(`paymentStatusList.${STATUS_LIST.paymentStatusList[value]}`),
      },
      {
        title: t('orders.order-status'),
        dataIndex: 'node.status',
        // SHOULD_NOT_BE_NULL
        render: (value: useOrdersColumnsFragmentEdgesNodeType['status']) =>
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
        render: (value: useOrdersColumnsFragmentEdgesNodeType['createdAt']) =>
          !value ? null : moment(value).format('YYYY/MM/DD HH:mm:ss'),
      },
      ...(extraColumns || []),
    ],
    [pageId, ecpayColumn, extraColumns, t],
  );
};
