// typescript import
import { QueryResult } from '@apollo/react-common';

import { I18nPropsType } from '@meepshop/utils/lib/i18n';
import { SetCurrentPropsType } from '@store/utils/lib/withSetCurrent';

// import
import React from 'react';
import { Query } from '@apollo/react-components';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';
import { Spin, Icon, Table } from 'antd';
import { areEqual, emptyFunction } from 'fbjs';
import memoizeOne from 'memoize-one';
import moment from 'moment';
import transformColor from 'color';

import { withTranslation } from '@meepshop/utils/lib/i18n';
import withSetCurrent from '@store/utils/lib/withSetCurrent';
import Link from '@meepshop/link';

import MobileColumn, { getMobileStyles } from './MobileColumn';
import Actions from './Actions';
import styles from './styles/index.less';

// graphql typescript
import {
  getOrders,
  getOrdersVariables,
  getOrders_viewer_orders as getOrdersViewerOrders,
  getOrders_viewer_orders_edges as getOrdersViewerOrdersEdges,
  getOrders_viewer_orders_edges_node as getOrdersViewerOrdersEdgesNode,
  getOrders_viewer_orders_edges_node_paymentInfo as getOrdersViewerOrdersEdgesNodePaymentInfo,
  getOrders_viewer_orders_edges_node_shipmentInfo as getOrdersViewerOrdersEdgesNodeShipmentInfo,
  getOrders_getColorList as getOrdersGetColorList,
  getOrders_getStoreAppList as getOrdersGetStoreAppList,
} from './__generated__/getOrders';

// graphql import
import { colorListFragment } from '@store/apollo-client-resolvers/lib/ColorList';
import {
  calculateOrderOrderFragment,
  calculateOrderOrderApplyListFragment,
} from '@store/apollo-client-resolvers/lib/utils/calculateOrder';
import { storeAppListFragment } from '@store/apollo-client-resolvers/lib/StoreAppList';

import { actionsOrderFragment, actionsStoreAppListFragment } from './Actions';

// typescript definition
interface PropsType
  extends I18nPropsType,
    SetCurrentPropsType,
    Pick<
      QueryResult<getOrders, getOrdersVariables>,
      'fetchMore' | 'variables'
    > {
  orders: getOrdersViewerOrders;
  appPlugins: getOrdersGetStoreAppList;
  colors: getOrdersGetColorList['colors'];
}

interface StateType {
  loading: boolean;
  prevOrders?: PropsType['orders'];
}

// definition
class MemberOrders extends React.PureComponent<PropsType> {
  public state = {
    loading: false,
  };

  public static getDerivedStateFromProps(
    nextProps: PropsType,
    prevState: StateType,
  ): null | StateType {
    const { orders } = nextProps;

    if (!areEqual(orders, prevState.prevOrders))
      return {
        loading: false,
        prevOrders: orders,
      };

    return null;
  }

  private columns = memoizeOne(
    ({ t, appPlugins }: Pick<PropsType, 't' | 'appPlugins'>) => [
      {
        title: t('date'),
        dataIndex: 'node.createdOn',
        render: (value: getOrdersViewerOrdersEdgesNode['createdOn']) =>
          moment
            .unix(value || 0 /** TODO: should not be null */)
            .format('YYYY/MM/DD'),
        width: 130,
      },
      {
        title: t('order.no'),
        dataIndex: 'node.orderNo',
        render: (
          value: getOrdersViewerOrdersEdgesNode['orderNo'],
          { node: { id } }: getOrdersViewerOrdersEdges,
        ) => (
          <Link href={`/order/${id}`}>
            <a href={`/order/${id}`}>{value}</a>
          </Link>
        ),
        width: 150,
      },
      {
        title: t('payment.title'),
        dataIndex: 'node.paymentInfo.status',
        render: (value: getOrdersViewerOrdersEdgesNodePaymentInfo['status']) =>
          t(`payment.${value}`),
        width: 130,
      },
      {
        title: t('shipment.title'),
        dataIndex: 'node.shipmentInfo.status',
        render: (value: getOrdersViewerOrdersEdgesNodeShipmentInfo['status']) =>
          t(`shipment.${value}`),
        width: 130,
      },
      {
        title: t('status.title'),
        dataIndex: 'node.status',
        render: (value: getOrdersViewerOrdersEdgesNode['status']) =>
          t(`status.${value}`),
        width: 130,
      },
      {
        key: 'action',
        dataIndex: 'node',
        render: (value: getOrdersViewerOrdersEdgesNode) => (
          <Actions
            order={filter(actionsOrderFragment, value)}
            appPlugins={filter(actionsStoreAppListFragment, appPlugins)}
          />
        ),
      },
      {
        key: 'mobileStyle',
        dataIndex: 'node',
        render: (value: getOrdersViewerOrdersEdgesNode) => (
          <MobileColumn {...value}>
            <Actions
              order={filter(actionsOrderFragment, value)}
              appPlugins={filter(actionsStoreAppListFragment, appPlugins)}
            />
          </MobileColumn>
        ),
      },
    ],
  );

  private changePage = (newCurrent: number): void => {
    const {
      // HOC
      setCurrent,

      // props
      variables: { first },
      orders: {
        edges,
        pageInfo: {
          endCursor,
          currentInfo: { current, ...currentInfo },
        },
      },
      fetchMore,
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
            cursor: endCursor,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if ((fetchMoreResult?.viewer?.orders?.edges || []).length > 0)
              return {
                ...previousResult,
                viewer: {
                  ...previousResult.viewer,
                  orders: {
                    __typename: 'OrderConnection',
                    edges: [
                      ...(previousResult?.viewer?.orders?.edges || []),
                      ...(fetchMoreResult?.viewer?.orders?.edges || []),
                    ],
                    pageInfo: {
                      ...fetchMoreResult?.viewer?.orders?.pageInfo,
                      currentInfo: {
                        ...currentInfo,
                        __typename: 'CurrentInfo',
                        current: newCurrent,
                      },
                    },
                    total: fetchMoreResult?.viewer?.orders?.total,
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

      // props
      orders: {
        edges,
        total,
        pageInfo: {
          currentInfo: { current },
        },
      },
      colors,
      appPlugins,
      variables: { first: pageSize },
    } = this.props;
    const { loading } = this.state;
    const endPage = Math.ceil(total / pageSize);

    return (
      <div className={styles.root}>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .${styles.root} .ant-table,
              .${styles.root} .ant-table-thead > tr > th {
                color: ${colors[3]};
              }

              .${styles.root} .ant-table-tbody > tr:hover > td {
                background: ${transformColor(colors[4]).alpha(0.1)};
              }

              .${styles.disabled} {
                color: ${transformColor(colors[3]).alpha(0.3)};
              }

              ${getMobileStyles(colors)}
            `,
          }}
        />

        <Table
          dataSource={[...edges].slice(
            current * pageSize,
            (current + 1) * pageSize,
          )}
          columns={this.columns({ t, appPlugins })}
          loading={loading}
          rowKey={
            ({ node: { id } }) =>
              id || 'null-id' /** TODO: should be not null */
          }
          pagination={false}
        />

        {endPage === 1 ? null : (
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
          </div>
        )}
      </div>
    );
  }
}

const EnhancedMemberOrders = withTranslation('member-orders')(
  withSetCurrent('member-orders')(MemberOrders),
);

export default React.memo(() => (
  <Query<getOrders, getOrdersVariables>
    query={gql`
      query getOrders($first: PositiveInt!, $cursor: String) {
        viewer {
          id
          orders(first: $first, after: $cursor) {
            edges {
              node {
                id
                createdOn
                orderNo
                paymentInfo {
                  status
                }
                shipmentInfo {
                  status
                }
                status
                ...calculateOrderOrderFragment
                ...actionsOrderFragment
              }
            }

            pageInfo {
              endCursor
              currentInfo(input: { pageId: "member-orders" }) @client {
                id
                current
              }
            }

            total
          }
        }

        getColorList {
          ...colorListFragment
        }

        getOrderApplyList(
          search: { size: 100, sort: [{ field: "createdOn", order: "desc" }] }
        ) {
          ...calculateOrderOrderApplyListFragment
        }

        getStoreAppList {
          ...storeAppListFragment
          ...actionsStoreAppListFragment
        }
      }

      ${colorListFragment}
      ${calculateOrderOrderFragment}
      ${calculateOrderOrderApplyListFragment}
      ${storeAppListFragment}
      ${actionsOrderFragment}
      ${actionsStoreAppListFragment}
    `}
    variables={{
      first: 10,
    }}
  >
    {({ loading, error, data, variables, fetchMore }) => {
      if (loading || error || !data)
        return <Spin indicator={<Icon type="loading" spin />} />;

      const { viewer, getColorList, getStoreAppList } = data;

      if (!viewer || !getColorList || !getStoreAppList)
        return <Spin indicator={<Icon type="loading" spin />} />;

      const { orders } = viewer;

      // TODO: should not be null
      if (!orders) return <Spin indicator={<Icon type="loading" spin />} />;

      return (
        <EnhancedMemberOrders
          orders={orders}
          colors={getColorList.colors}
          appPlugins={getStoreAppList}
          variables={variables}
          fetchMore={fetchMore}
        />
      );
    }}
  </Query>
));
