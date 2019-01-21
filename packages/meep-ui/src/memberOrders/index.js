import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { filter } from 'graphql-anywhere';
import { Spin, Icon, Table } from 'antd';
import moment from 'moment';
import memoizeOne from 'memoize-one';
import transformColor from 'color';
import { emptyFunction } from 'fbjs';

import { contextProvider } from 'context';
import Link from 'link';

import Actions, {
  actionsFragment,
  actionsOrderApplyListFragment,
} from './Actions';
import MobileColumn from './MobileColumn';
import { MAX_ITEMS } from './constants';
import * as LOCALE from './locale';
import styles from './styles/index.less';

const { enhancer } = contextProvider(['storeSetting', 'locale']);
let cacheCurrent = 0;

@enhancer
class MemberOrders extends React.PureComponent {
  static propTypes = {
    orders: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
    }).isRequired,
    orderApplyList: PropTypes.arrayOf(PropTypes.shape({}).isRequired)
      .isRequired,
    fetchMore: PropTypes.func.isRequired,
  };

  state = {
    current: cacheCurrent,
    loading: false,
  };

  columns = memoizeOne(() => {
    const {
      /** context */
      transformLocale,

      /** props */
      orderApplyList,
    } = this.props;

    return [
      {
        title: transformLocale(LOCALE.DATE),
        dataIndex: 'node.createdOn',
        render: value => moment.unix(value).format('YYYY/MM/DD'),
        width: 130,
      },
      {
        title: transformLocale(LOCALE.ORDER_NO),
        dataIndex: 'node.orderNo',
        render: (value, { node: { id } }) => (
          <Link href={`/order/${id}`} className={styles.link}>
            {value}
          </Link>
        ),
        width: 150,
      },
      {
        title: transformLocale(LOCALE.PAYMENT_TITLE),
        dataIndex: 'node.paymentInfo.status',
        render: value => transformLocale(LOCALE.PAYMENT[value]),
        width: 130,
      },
      {
        title: transformLocale(LOCALE.SHIPMENT_TITLE),
        dataIndex: 'node.shipmentInfo.status',
        render: value => transformLocale(LOCALE.SHIPMENT[value]),
        width: 130,
      },
      {
        title: transformLocale(LOCALE.STATUS_TITLE),
        dataIndex: 'node.status',
        render: value => transformLocale(LOCALE.STATUS[value]),
        width: 130,
      },
      {
        key: 'action',
        dataIndex: 'node',
        render: value => (
          <Actions
            node={filter(actionsFragment, value)}
            orderApplyList={filter(
              actionsOrderApplyListFragment,
              orderApplyList,
            )}
          />
        ),
      },
      {
        key: 'mobile',
        dataIndex: 'node',
        render: value => (
          <MobileColumn node={value} orderApplyList={orderApplyList} />
        ),
      },
    ];
  });

  componentDidUpdate(prevProps) {
    const {
      orders: { edges },
    } = this.props;
    const { current, loading } = this.state;

    if (loading && edges.length !== prevProps.orders.edges.length)
      setTimeout(() => {
        this.setState({ current: current + 1, loading: false });
      }, 0);
  }

  prev = () => {
    const { current, loading } = this.state;

    if (loading) return;

    cacheCurrent = current - 1;
    this.setState({ current: current - 1 });
  };

  next = () => {
    const {
      orders: {
        edges,
        pageInfo: { endCursor },
      },
      fetchMore,
    } = this.props;
    const { current, loading } = this.state;

    if (loading) return;

    if (Math.ceil(edges.length / MAX_ITEMS) - 1 > current) {
      cacheCurrent = current + 1;
      this.setState({ current: current + 1 });
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
            first: MAX_ITEMS,
          },
          updateQuery: (
            previousResult,
            {
              fetchMoreResult: {
                viewer: {
                  orders: { edges: newEdges, pageInfo, total },
                },
              },
            },
          ) => {
            cacheCurrent = current + 1;

            return edges.length > 0
              ? {
                  ...previousResult,
                  viewer: {
                    ...previousResult.viewer,
                    orders: {
                      __typename: previousResult.viewer.orders.__typename,
                      edges: [
                        ...previousResult.viewer.orders.edges,
                        ...newEdges,
                      ],
                      pageInfo,
                      total,
                    },
                  },
                }
              : previousResult;
          },
        }),
    );
  };

  render() {
    const {
      /** context */
      storeSetting: { colors },

      /** props */
      orders: { edges, total },
    } = this.props;
    const { current, loading } = this.state;
    const pageSize = Math.ceil(total / MAX_ITEMS);

    return (
      <div className={`color-3 ${styles.root}`}>
        <Table
          dataSource={[...edges].slice(
            current * MAX_ITEMS,
            (current + 1) * MAX_ITEMS,
          )}
          columns={this.columns()}
          loading={loading}
          pagination={false}
          rowKey={({ node: { id } }) => id}
        />

        {pageSize === 1 ? null : (
          <div className={styles.pagination}>
            <div>
              <Icon
                type="left"
                className={current === 0 ? 'disabled' : ''}
                onClick={current === 0 ? emptyFunction : this.prev}
              />
              {current + 1} / {pageSize}
              <Icon
                type="right"
                className={current === pageSize - 1 ? 'disabled' : ''}
                onClick={current === pageSize - 1 ? emptyFunction : this.next}
              />
            </div>
          </div>
        )}

        <style
          dangerouslySetInnerHTML={{
            __html: `
              .${styles.root} .ant-table-tbody > tr:hover > td {
                background: ${transformColor(colors[4]).alpha(0.1)};
              }

              .${styles.pagination} > div i.anticon.disabled {
                color: ${transformColor(colors[3]).alpha(0.3)};
              }
            `,
          }}
        />
      </div>
    );
  }
}

const query = gql`
  query getMemberOrders($first: PositiveInt!, $cursor: String) {
    viewer {
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
            ...actionsFragment
          }
        }
        pageInfo {
          endCursor
        }
        total
      }
    }

    # TODO: use new api
    getOrderApplyList(
      search: { size: 100, sort: [{ field: "createdOn", order: "desc" }] }
    ) {
      orderApplyList: data {
        ...actionsOrderApplyListFragment
      }
    }
  }
  ${actionsFragment}
  ${actionsOrderApplyListFragment}
`;

export default () => (
  <Query
    query={query}
    variables={{
      first: MAX_ITEMS,
    }}
  >
    {({ loading, error, data, fetchMore, client }) => {
      if (loading || error)
        return <Spin indicator={<Icon type="loading" spin />} />;

      const {
        viewer: { orders },
        getOrderApplyList: { orderApplyList },
      } = data;
      const props = {
        orders,
        orderApplyList,
        fetchMore,
      };

      if (cacheCurrent * MAX_ITEMS > orders.length) {
        const cacheData = client.readQuery({
          query,
          variables: {
            first: (cacheCurrent + 1) * MAX_ITEMS,
          },
        });

        props.orders = cacheData.viewer.orders;
        props.orderApplyList = cacheData.getOrderApplyList.orderApplyList;
      }

      return <MemberOrders {...props} />;
    }}
  </Query>
);
