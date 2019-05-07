// typescript import
import { I18nPropsType } from '@admin/utils/lib/i18n';

import { getEcfitListQueryPropsType } from './constants';

// import
import React from 'react';
import { gql } from 'apollo-boost';
import { Table, Icon, Select, Spin, Empty } from 'antd';
import Link from 'next/link';
import idx from 'idx';
import { emptyFunction } from 'fbjs';
import memoizeOne from 'memoize-one';
import moment from 'moment';

import { withNamespaces } from '@admin/utils/lib/i18n';

import { STATUS_LIST } from './constants';
import styles from './styles/orders.less';

// graphql typescript
import {
  ordersFragment as ordersFragmentType,
  ordersFragment_edges as ordersFragmentEdges,
  ordersFragment_edges_node as ordersFragmentEdgesNode,
  ordersFragment_edges_node_lastEcfitRequestRecord as ordersFragmentEdgesNodeLastEcfitRequestRecord,
  ordersFragment_edges_node_paymentInfo as ordersFragmentEdgesNodePaymentInfo,
  ordersFragment_edges_node_shipmentInfo as ordersFragmentEdgesNodeShipmentInfo,
} from './__generated__/ordersFragment';

// typescript definition
export type PropsType = I18nPropsType &
  Pick<getEcfitListQueryPropsType, 'variables' | 'refetch'> & {
    selectOrders: (selectedKeys: string[]) => void;
    changePage: (current: number) => void;
    runningIds: string[];
    selected: string[];
    current: number;
    loading: boolean;
    ecfitOrders: ordersFragmentType;
  };

// definition
const { Option } = Select;

export const ordersFragment = gql`
  fragment ordersFragment on OrderConnection {
    edges {
      node {
        id
        orderNo
        shipmentInfo {
          status
          list {
            name
            recipient {
              name
            }
          }
        }
        paymentInfo {
          status
        }
        status
        priceInfo {
          total
        }
        createdOn
        lastEcfitRequestRecord {
          createdAt
          response
        }
      }
    }
    total
  }
`;

class Orders extends React.PureComponent<PropsType> {
  private columns = memoizeOne(() => {
    const {
      // HOC
      t,

      // props
      variables,
    } = this.props;

    return [
      {
        title: t('orders.order-no'),
        dataIndex: 'node.orderNo',
        render: (
          value: ordersFragmentEdgesNode['orderNo'],
          edge: ordersFragmentEdges,
        ) => {
          // TODO: should not be null
          const id = idx(edge, _ => _.node.id);

          return (
            <>
              <Spin />

              {!id ? (
                value
              ) : (
                <Link href={`/orders/${id}`}>
                  <a href={`/orders/${id}`}>{value}</a>
                </Link>
              )}
            </>
          );
        },
      },
      {
        title: t('orders.shipment-name'),
        dataIndex: 'node.shipmentInfo.list[0].name',
      },
      {
        title: t('orders.payment-status'),
        dataIndex: 'node.paymentInfo.status',
        // TODO: should not be null
        render: (value: ordersFragmentEdgesNodePaymentInfo['status']) =>
          value === null
            ? null
            : t(`paymentStatusList.${STATUS_LIST.paymentStatusList[value]}`),
      },
      {
        title: t('orders.shipment-status'),
        dataIndex: 'node.shipmentInfo.status',
        // TODO: should not be null
        render: (value: ordersFragmentEdgesNodeShipmentInfo['status']) =>
          value === null
            ? null
            : t(`shipmentStatusList.${STATUS_LIST.shipmentStatusList[value]}`),
      },
      {
        title: t('orders.order-status'),
        dataIndex: 'node.status',
        // TODO: should not be null
        render: (value: ordersFragmentEdgesNode['status']) =>
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
        title: t('orders.create-on'),
        dataIndex: 'node.createdOn',
        render: (value: ordersFragmentEdgesNode['createdOn']) =>
          // TODO: should not be null
          !value ? null : moment.unix(value).format('YYYY/MM/DD HH:mm:ss'),
      },
      ...(idx(variables, _ => _.filter.ecfitSentStatus) !== 'SENT_SUCCESSFUL'
        ? []
        : [
            {
              title: t('orders.send-time'),
              dataIndex: 'node.lastEcfitRequestRecord.createdAt',
              render: (
                value: ordersFragmentEdgesNodeLastEcfitRequestRecord['createdAt'],
              ) =>
                !value ? null : moment(value).format('YYYY/MM/DD HH:mm:ss'),
            },
          ]),
      ...(idx(variables, _ => _.filter.ecfitSentStatus) !== 'SENT_FAILED'
        ? []
        : [
            {
              title: t('orders.fail-reason'),
              dataIndex: 'node.lastEcfitRequestRecord.response',
              render: (
                value: ordersFragmentEdgesNodeLastEcfitRequestRecord['response'],
              ) => (!value ? null : t(`fail-reason.${value}`)),
            },
          ]),
    ];
  });

  public render(): React.ReactNode {
    const {
      // HOC
      t,

      // props
      runningIds,
      selected,
      current,
      loading,
      selectOrders,
      changePage,
      variables,
      refetch,
      ecfitOrders: { edges, total },
    } = this.props;

    // TODO: should be not null
    if (total === null || !edges) throw new Error('should be not null');

    const { first: pageSize } = variables;
    const endPage = Math.ceil(total / pageSize);

    return (
      <>
        <Table
          dataSource={[...edges].slice(
            current * pageSize,
            (current + 1) * pageSize,
          )}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={t('empty-orders')}
              />
            ),
          }}
          columns={this.columns()}
          loading={loading}
          rowClassName={edge =>
            runningIds.includes(
              idx(edge, _ => _.node.id) ||
                'null-id' /** TODO: should be not null */,
            )
              ? styles.running
              : ''
          }
          rowKey={
            edge =>
              idx(edge, _ => _.node.id) ||
              'null-id' /** TODO: should be not null */
          }
          rowSelection={{
            selectedRowKeys: selected,
            onChange: selectOrders,
          }}
          pagination={false}
        />

        <div className={styles.root}>
          <div>
            {t('orders-info.0')}
            {total}
            {t('orders-info.1')}

            {selected.length === 0 ? null : (
              <>
                {t('orders-info.2')}

                <span className={styles.selected}>{selected.length}</span>

                {t('orders-info.3')}
              </>
            )}
          </div>

          <div className={styles.pagination}>
            <Icon
              type="left"
              className={current === 0 ? styles.disabled : ''}
              onClick={
                current === 0 ? emptyFunction : () => changePage(current - 1)
              }
            />
            {current + 1} / {endPage}
            <Icon
              type="right"
              className={current === endPage - 1 ? styles.disabled : ''}
              onClick={
                current === endPage - 1
                  ? emptyFunction
                  : () => changePage(current + 1)
              }
            />
            <Select
              className={styles.pageSize}
              value={pageSize}
              onChange={value =>
                refetch({
                  ...variables,
                  first: value,
                })
              }
            >
              {[10, 20, 50, 100, 500].map(value => (
                <Option key={value} value={value}>
                  {value}
                  {t('page-size')}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </>
    );
  }
}

export default withNamespaces('orders-ecfit')(Orders);
