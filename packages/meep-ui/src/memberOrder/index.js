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
        categories: [{ products }],
        environment: { sourcePage },
        id,
        messages,
        ...order
      },
    } = this.props;

    return (
      <div className={styles.root} style={{ color: colors[3] }}>
        <div className={styles.wrapper}>
          <div className={styles.subTitle}>
            <span>{`${transformLocale(LOCALE.ORDER_NO)}${orderNo}`}</span>

            <span>
              <font>{transformLocale(LOCALE.CREATED_ON)}</font>

              {moment.unix(createdOn).format('YYYY/MM/DD')}
            </span>
          </div>

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
                .${styles.subTitle} > span:last-child {
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

export default withRouter(({ router }) => (
  <Query
    query={gql`
      query getMemberOrder($orderId: ID!) {
        viewer {
          order(orderId: $orderId) {
            orderNo
            createdOn
            categories {
              products {
                ...productsFragment
              }
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
    variables={router.query}
  >
    {({ loading, error, data }) => {
      if (loading) return <Spin indicator={<Icon type="loading" spin />} />;
      if (error) return <NotFound />;

      const {
        viewer: { order },
      } = data;

      return <MemberOrder order={order} />;
    }}
  </Query>
));
