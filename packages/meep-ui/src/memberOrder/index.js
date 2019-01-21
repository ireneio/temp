import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { filter } from 'graphql-anywhere';
import { withRouter } from 'next/router';
import { Spin, Icon } from 'antd';
import moment from 'moment';
import transformColor from 'color';

import { contextProvider } from 'context';

import NotFound from './NotFound';
import Products, { productsFragment } from './Products';
import TotalSheet, { totalSheetFragment } from './TotalSheet';
import Blocks, { blocksFragment } from './blocks';
import Qa, { qaFragment } from './Qa';
import * as LOCALE from './locale';
import styles from './styles/index.less';

const { enhancer } = contextProvider(['storeSetting', 'locale']);

@enhancer
class MemberOrder extends React.PureComponent {
  static propTypes = {
    order: PropTypes.shape({}).isRequired,
  };

  render() {
    const {
      /** context */
      storeSetting: { colors },
      transformLocale,

      /** props */
      order: {
        orderNo,
        createdOn,
        products,
        environment: { sourcePage },
        id,
        messages,
        ...order
      },
    } = this.props;

    return (
      <div className={styles.root} style={{ color: colors[3] }}>
        <div className={styles.wrapper}>
          <h1>
            <font>{`${transformLocale(LOCALE.ORDER_NO)}${orderNo}`}</font>

            <font>
              <font>{transformLocale(LOCALE.CREATED_ON)}</font>

              {moment.unix(createdOn).format('YYYY/MM/DD')}
            </font>
          </h1>

          <Products products={filter(productsFragment, products)} />

          <TotalSheet order={filter(totalSheetFragment, order)} />

          <Blocks order={filter(blocksFragment, order)} />

          {sourcePage === 'lp' ? null : (
            <Qa messages={filter(qaFragment, messages)} orderId={id} />
          )}
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

export default withRouter(({ router: { query: { orderId } } }) => (
  <Query
    query={gql`
      query getMemberOrder($orderId: ID!) {
        viewer {
          order(orderId: $orderId) {
            orderNo
            createdOn
            products {
              ...memberOrder_productsFragment
            }
            environment {
              sourcePage
            }
            id
            messages {
              ...qaFragment
            }
            ...totalSheetFragment
            ...blocksFragment
          }
        }
      }
      ${productsFragment}
      ${totalSheetFragment}
      ${blocksFragment}
      ${qaFragment}
    `}
    variables={{ orderId }}
  >
    {({ loading, error, data }) => {
      if (loading || error)
        return <Spin indicator={<Icon type="loading" spin />} />;

      const {
        viewer: { order },
      } = data;

      if (!order) return <NotFound />;

      return <MemberOrder order={order} />;
    }}
  </Query>
));
