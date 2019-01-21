import React from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { filter } from 'graphql-anywhere';
import { withRouter } from 'next/router';
import { Spin, Icon, Button, message } from 'antd';
import moment from 'moment';
import transformColor from 'color';

import { contextProvider } from 'context';

import Products, {
  productsFragment,
  productsOrderApplyListFragment,
} from './Products';
import ReplaceForm, { replaceFormFragment } from './ReplaceForm';
import styles from './styles/index.less';
import * as LOCALE from './locale';

const { enhancer } = contextProvider(['locale', 'func', 'storeSetting']);

@enhancer
class MemberOrderApply extends React.PureComponent {
  static propTypes = {
    order: PropTypes.shape({}).isRequired,
    orderApplyList: PropTypes.arrayOf(PropTypes.shape({}).isRequired)
      .isRequired,
    type: PropTypes.oneOf(['orderRefund', 'orderExchange']).isRequired,
  };

  state = {
    products: [],
    checking: false,
    replaceRecipient: null,
  };

  submit = createApply => () => {
    const {
      /** context */
      transformLocale,

      /** props */
      type,
      order: { id },
    } = this.props;
    const { checking, products, replaceRecipient } = this.state;

    if (products.length === 0)
      return message.info(transformLocale(LOCALE.WARNING(type)));

    if (type === 'orderExchange' && !replaceRecipient)
      return message.info(transformLocale(LOCALE.WARNING(type)));

    if (!checking) return this.setState({ checking: true });

    return createApply({
      variables: {
        createOrderApplyList: {
          applicationType: type === 'orderRefund' ? 'return' : 'replace',
          orderId: id,
          orderProducts: products.map(
            ({
              id: productId,
              reason: comment,
              quantitySelected: quantity,
            }) => ({
              id: productId,
              quantity,
              applicationInfo: {
                comment,
              },
            }),
          ),
          ...(type !== 'orderExchange'
            ? null
            : {
                recipient: replaceRecipient,
              }),
        },
      },
    });
  };

  updateApply = (cache, { data: { createOrderApplyList } }) => {
    const { goTo } = this.props;
    const query = gql`
      {
        # TODO: use new api
        getOrderApplyList(
          search: { size: 100, sort: [{ field: "createdOn", order: "desc" }] }
        ) {
          orderApplyList: data {
            ...productsOrderApplyListFragment
          }
        }
      }
      ${productsOrderApplyListFragment}
    `;
    const {
      getOrderApplyList: { orderApplyList },
    } = cache.readQuery({
      query,
    });

    cache.writeQuery({
      query,
      data: {
        getOrderApplyList: {
          __typename: 'OrderApplyList',
          orderApplyList: [...createOrderApplyList, ...orderApplyList],
        },
      },
    });

    goTo({ pathname: '/orders' });
  };

  render() {
    const {
      /** context */
      transformLocale,
      storeSetting: { colors },
      goTo,

      /** props */
      order: {
        orderNo,
        createdOn,
        shipmentInfo: {
          list: [{ recipient }],
        },
        ...order
      },
      orderApplyList,
      type,
    } = this.props;
    const { checking, products, replaceRecipient } = this.state;

    return (
      <div className={styles.root}>
        <h1>
          <font>
            {transformLocale(LOCALE.ORDER_NO)}
            {orderNo}
          </font>

          <font>
            <font>{transformLocale(LOCALE.CREATED_ON)}</font>

            {moment.unix(createdOn).format('YYYY/MM/DD')}
          </font>
        </h1>

        {type !== 'orderExchange' || !checking ? null : (
          <div className={styles.replaceInfo}>
            {[
              {
                key: 'name',
                children: `${transformLocale(LOCALE.RECIPIENT_NAME)}：${
                  replaceRecipient.name
                }`,
              },
              {
                key: 'mobile',
                children: `${transformLocale(LOCALE.RECIPIENT_MOBILE)}：${
                  replaceRecipient.mobile
                }`,
              },
              {
                key: 'address',
                children: `${transformLocale(LOCALE.RECIPIENT_ADDRESS)}：${
                  replaceRecipient.address.streetAddress
                }`,
              },
            ].map(props => (
              <p {...props} />
            ))}
          </div>
        )}

        <Products
          order={filter(productsFragment, order)}
          orderApplyList={filter(
            productsOrderApplyListFragment,
            orderApplyList,
          )}
          type={type}
          checking={checking}
          onChange={newProducts => this.setState({ products: newProducts })}
          products={checking ? products : null}
        />

        {type !== 'orderExchange' || checking ? null : (
          <ReplaceForm
            recipient={filter(replaceFormFragment, recipient)}
            onChange={value => this.setState({ replaceRecipient: value })}
          />
        )}

        <div className={styles.buttonRoot}>
          <Button
            style={{
              color: colors[3],
              borderColor: colors[3],
            }}
            onClick={() =>
              checking
                ? this.setState({ checking: false })
                : goTo({ pathname: '/orders' })
            }
            size="large"
          >
            {transformLocale(LOCALE.RECEDE)}
          </Button>

          <Mutation
            mutation={gql`
              mutation createApply($createOrderApplyList: [NewOrderApply]) {
                createOrderApplyList(
                  createOrderApplyList: $createOrderApplyList
                ) {
                  ...productsOrderApplyListFragment
                }
              }
              ${productsOrderApplyListFragment}
            `}
            update={this.updateApply}
          >
            {createApply => (
              <Button
                style={{
                  color: colors[3],
                  borderColor: colors[3],
                }}
                onClick={this.submit(createApply)}
                size="large"
              >
                {transformLocale(LOCALE.PROCEED(checking))}
              </Button>
            )}
          </Mutation>
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
              @media ${styles.phoneMedia} {
                .${styles.root} h1 > font:last-child {
                  color: ${transformColor(colors[3]).alpha(0.5)};
                }
              }
            `,
          }}
        />
      </div>
    );
  }
}

export default withRouter(({ router: { pathname, query: { orderId } } }) => (
  <Query
    query={gql`
      query getMemberOrderApplyList($orderId: ID!) {
        viewer {
          order(orderId: $orderId) {
            id
            orderNo
            createdOn
            ...memberOrderApply_productsFragment
            shipmentInfo {
              list {
                recipient {
                  ...replaceFormFragment
                }
              }
            }
          }
        }

        # TODO: use new api
        getOrderApplyList(
          search: { size: 100, sort: [{ field: "createdOn", order: "desc" }] }
        ) {
          orderApplyList: data {
            ...productsOrderApplyListFragment
          }
        }
      }
      ${productsFragment}
      ${productsOrderApplyListFragment}
      ${replaceFormFragment}
    `}
    variables={{
      orderId,
    }}
  >
    {({ loading, error, data }) => {
      if (loading || error)
        return <Spin indicator={<Icon type="loading" spin />} />;

      const {
        viewer: { order },
        getOrderApplyList: { orderApplyList },
      } = data;

      return (
        <MemberOrderApply
          order={order}
          orderApplyList={orderApplyList}
          type={pathname.replace(/\//g, '')}
        />
      );
    }}
  </Query>
));
