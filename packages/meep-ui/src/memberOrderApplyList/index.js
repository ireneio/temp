import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { filter } from 'graphql-anywhere';
import { withRouter } from 'next/router';
import { Spin, Icon } from 'antd';
import moment from 'moment';

import { contextProvider } from 'context';

import OrderApply, {
  orderApplyFragment,
  orderApplyProductFragment,
} from './OrderApply';
import styles from './styles/index.less';
import * as LOCALE from './locale';

const { enhancer } = contextProvider('locale');

@enhancer
class MemberOrderApplyList extends React.PureComponent {
  static propTypes = {
    order: PropTypes.shape({}).isRequired,
    orderApplyData: PropTypes.shape({}).isRequired,
  };

  render() {
    const {
      /** context */
      transformLocale,

      /** props */
      order: { orderNo, createdOn },
      orderApplyData,
    } = this.props;

    return (
      <div className={styles.root}>
        <div>
          <h1>
            <font>
              {transformLocale(LOCALE.ORDER_NO)}
              {orderNo}
            </font>

            <font>
              <span>{transformLocale(LOCALE.ORDER_DATE)}</span>

              {moment.unix(createdOn).format('YYYY/MM/DD')}
            </font>
          </h1>
          {Object.keys(orderApplyData).map(key => (
            <OrderApply key={key} applyList={orderApplyData[key]} />
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(({ router: { query: { orderId } } }) => (
  <Query
    query={gql`
      query getMemberOrderApplyList($orderId: ID!) {
        viewer {
          id
          order(orderId: $orderId) {
            id
            orderNo
            createdOn
            products {
              id
              ...orderApplyProductFragment
            }
          }
        }

        # TODO: use new api
        getOrderApplyList(
          search: { size: 100, sort: [{ field: "createdOn", order: "desc" }] }
        ) {
          orderApplyList: data {
            orderId
            orderProductId
            returnId
            ...orderApplyFragment
          }
        }
      }
      ${orderApplyFragment}
      ${orderApplyProductFragment}
    `}
    variables={{
      orderId,
    }}
  >
    {({ loading, error, data }) => {
      if (loading || error)
        return <Spin indicator={<Icon type="loading" spin />} />;

      const {
        viewer: {
          order: { id, products, ...order },
        },
        getOrderApplyList: { orderApplyList },
      } = data;

      return (
        <MemberOrderApplyList
          order={order}
          orderApplyData={orderApplyList.reduce(
            (result, { orderProductId, returnId, ...orderApply }) => {
              if (id !== orderApply.orderId) return result;

              // eslint-disable-next-line no-param-reassign
              if (!result[returnId]) result[returnId] = [];

              result[returnId].push({
                orderApply: filter(orderApplyFragment, orderApply),
                product: filter(
                  orderApplyProductFragment,
                  products.find(product => product.id === orderProductId) ||
                    null,
                ),
              });

              return result;
            },
            {},
          )}
        />
      );
    }}
  </Query>
));
