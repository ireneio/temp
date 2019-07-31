// typescript import
import { MutationFn } from 'react-apollo';

import { I18nPropsType } from '@admin/utils/lib/i18n';
import { SetCurrentPropsType } from '@admin/utils/lib/withSetCurrent';

import { getEcfitListQueryPropsType } from './constants';

// import
import React from 'react';
import { gql } from 'apollo-boost';
import { Table, Icon, Select, Spin, Empty } from 'antd';
import Link from 'next/link';
import idx from 'idx';
import { emptyFunction, areEqual } from 'fbjs';
import memoizeOne from 'memoize-one';
import moment from 'moment';

import { withNamespaces } from '@admin/utils/lib/i18n';
import withSetCurrent from '@admin/utils/lib/withSetCurrent';

import { STATUS_LIST } from './constants';
import styles from './styles/orders.less';

// graphql typescript
import {
  ordersOrderConnectionFragment as ordersOrderConnectionFragmentType,
  ordersOrderConnectionFragment_edges as ordersOrderConnectionFragmentEdges,
  ordersOrderConnectionFragment_edges_node as ordersOrderConnectionFragmentEdgesNode,
  ordersOrderConnectionFragment_edges_node_lastEcfitRequestRecord as ordersOrderConnectionFragmentEdgesNodeLastEcfitRequestRecord,
  ordersOrderConnectionFragment_edges_node_paymentInfo as ordersOrderConnectionFragmentEdgesNodePaymentInfo,
  ordersOrderConnectionFragment_edges_node_shipmentInfo as ordersOrderConnectionFragmentEdgesNodeShipmentInfo,
} from './__generated__/ordersOrderConnectionFragment';
import { ordersPageInfoFragment as ordersPageInfoFragmentType } from './__generated__/ordersPageInfoFragment';
import {
  setOrdersToSelectedOrders,
  setOrdersToSelectedOrdersVariables,
} from './__generated__/setOrdersToSelectedOrders';

// typescript definition
export interface PropsType
  extends I18nPropsType,
    SetCurrentPropsType,
    Pick<getEcfitListQueryPropsType, 'variables' | 'refetch' | 'fetchMore'> {
  runningIds: string[];
  ecfitOrders: ordersOrderConnectionFragmentType & {
    pageInfo: ordersPageInfoFragmentType;
  };
  selectedOrders: ordersOrderConnectionFragmentType;
  setOrdersToSelectedOrdersMutation: MutationFn<
    setOrdersToSelectedOrders,
    setOrdersToSelectedOrdersVariables
  >;
}

interface StateType {
  loading: boolean;
  prevEcfitOrders?: PropsType['ecfitOrders'];
}

// definition
const { Option } = Select;

export const ordersOrderConnectionFragment = gql`
  fragment ordersOrderConnectionFragment on OrderConnection {
    edges {
      node {
        id
        orderNo
        shipmentInfo {
          status
          list {
            id
            name
            recipient {
              name
            }
          }
        }
        paymentInfo {
          id
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

export const ordersPageInfoFragment = gql`
  fragment ordersPageInfoFragment on PageInfo {
    endCursor
    currentInfo(input: { pageId: "orders-ecfit" }) @client {
      id
      current
    }
  }
`;

class Orders extends React.PureComponent<PropsType, StateType> {
  public state = {
    loading: false,
  };

  public static getDerivedStateFromProps(
    nextProps: PropsType,
    prevState: StateType,
  ): null | StateType {
    const { ecfitOrders } = nextProps;

    if (!areEqual(ecfitOrders, prevState.prevEcfitOrders))
      return {
        loading: false,
        prevEcfitOrders: ecfitOrders,
      };

    return null;
  }

  private columns = memoizeOne(
    (
      { t }: Pick<PropsType, 't' | 'i18n'>,
      variables: getEcfitListQueryPropsType['variables'],
    ) => [
      {
        title: t('orders.order-no'),
        dataIndex: 'node.orderNo',
        render: (
          value: ordersOrderConnectionFragmentEdgesNode['orderNo'],
          // TODO: should not be null
          { node: { id } }: ordersOrderConnectionFragmentEdges,
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
        // TODO: should not be null
        render: (
          value: ordersOrderConnectionFragmentEdgesNodePaymentInfo['status'],
        ) =>
          value === null
            ? null
            : t(`paymentStatusList.${STATUS_LIST.paymentStatusList[value]}`),
      },
      {
        title: t('orders.shipment-status'),
        dataIndex: 'node.shipmentInfo.status',
        // TODO: should not be null
        render: (
          value: ordersOrderConnectionFragmentEdgesNodeShipmentInfo['status'],
        ) =>
          value === null
            ? null
            : t(`shipmentStatusList.${STATUS_LIST.shipmentStatusList[value]}`),
      },
      {
        title: t('orders.order-status'),
        dataIndex: 'node.status',
        // TODO: should not be null
        render: (value: ordersOrderConnectionFragmentEdgesNode['status']) =>
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
        render: (value: ordersOrderConnectionFragmentEdgesNode['createdOn']) =>
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
                value: ordersOrderConnectionFragmentEdgesNodeLastEcfitRequestRecord['createdAt'],
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
                value: ordersOrderConnectionFragmentEdgesNodeLastEcfitRequestRecord['response'],
              ) => (!value ? null : t(`fail-reason.${value}`)),
            },
          ]),
    ],
  );

  public componentDidUpdate(prevProps: PropsType): void {
    const {
      variables: { filter },
      setOrdersToSelectedOrdersMutation,
    } = this.props;

    if (!areEqual(filter, prevProps.variables.filter))
      setOrdersToSelectedOrdersMutation({
        variables: {
          input: {
            ids: [],
          },
        },
      });
  }

  private changePage = (newCurrent: number) => {
    const {
      variables: { first, ...variables },
      ecfitOrders: {
        edges,
        pageInfo: {
          endCursor,
          currentInfo: { current, ...currentInfo },
        },
      },
      fetchMore,
      setCurrent,
    } = this.props;
    const { loading } = this.state;

    if (loading || newCurrent === current) return;

    if (newCurrent < current || Math.ceil(edges.length / first) - 1 > current) {
      setCurrent(newCurrent);
      return;
    }

    this.setState(
      {
        loading: true,
      },
      () =>
        fetchMore({
          variables: {
            ...variables,
            cursor: endCursor,
            first,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (
              (idx(fetchMoreResult, _ => _.viewer.ecfitOrders.edges) || [])
                .length > 0
            )
              return {
                ...previousResult,
                viewer: {
                  ...previousResult.viewer,
                  ecfitOrders: {
                    __typename: 'OrderConnection',
                    edges: [
                      ...(idx(
                        previousResult,
                        _ => _.viewer.ecfitOrders.edges,
                      ) || []),
                      ...(idx(
                        fetchMoreResult,
                        _ => _.viewer.ecfitOrders.edges,
                      ) || []),
                    ],
                    pageInfo: {
                      ...idx(
                        fetchMoreResult,
                        _ => _.viewer.ecfitOrders.pageInfo,
                      ),
                      currentInfo: {
                        ...currentInfo,
                        __typename: 'CurrentInfo',
                        current: newCurrent,
                      },
                    },
                    total: idx(
                      fetchMoreResult,
                      _ => _.viewer.ecfitOrders.total,
                    ),
                  },
                },
              };

            this.setState({ loading: false });

            return previousResult;
          },
        }),
    );
  };

  public render(): React.ReactNode {
    const {
      // HOC
      t,
      i18n,

      // props
      runningIds,
      selectedOrders,
      variables,
      refetch,
      ecfitOrders: {
        edges,
        total,
        pageInfo: {
          currentInfo: { current },
        },
      },
      setOrdersToSelectedOrdersMutation,
    } = this.props;
    const { loading } = this.state;
    const { first: pageSize } = variables;
    const endPage = Math.ceil(total / pageSize);

    return (
      <>
        <Table
          className={styles.table}
          dataSource={edges.slice(current * pageSize, (current + 1) * pageSize)}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={t('empty-orders')}
              />
            ),
          }}
          columns={this.columns({ t, i18n }, variables)}
          loading={loading}
          rowClassName={({ node: { id } }) =>
            runningIds.includes(id || 'null-id' /** TODO: should be not null */)
              ? styles.running
              : ''
          }
          rowKey={
            ({ node: { id } }) =>
              id || 'null-id' /** TODO: should be not null */
          }
          rowSelection={{
            selectedRowKeys: selectedOrders.edges.map(
              ({ node: { id } }) =>
                id || 'null-id' /** TODO: should be not null */,
            ),
            onChange: ids =>
              setOrdersToSelectedOrdersMutation({
                variables: { input: { ids } },
              } as { variables: setOrdersToSelectedOrdersVariables }),
          }}
          pagination={false}
        />

        <div className={styles.root}>
          <div>
            {t('orders-info.0')}
            {total}
            {t('orders-info.1')}

            {selectedOrders.total === 0 ? null : (
              <>
                {t('orders-info.2')}

                <span className={styles.selected}>{selectedOrders.total}</span>

                {t('orders-info.3')}
              </>
            )}
          </div>

          <div className={styles.pagination}>
            <Icon
              type="left"
              className={current === 0 ? styles.disabled : ''}
              onClick={
                current === 0
                  ? emptyFunction
                  : () => this.changePage(current - 1)
              }
            />
            {current + 1} / {endPage}
            <Icon
              type="right"
              className={current === endPage - 1 ? styles.disabled : ''}
              onClick={
                current === endPage - 1
                  ? emptyFunction
                  : () => this.changePage(current + 1)
              }
            />
            <Select
              className={styles.pageSize}
              value={pageSize}
              onChange={(value: 10 | 20 | 50 | 100 | 500) =>
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

export default withNamespaces('orders-ecfit')(
  withSetCurrent('orders-ecfit')(Orders),
);
