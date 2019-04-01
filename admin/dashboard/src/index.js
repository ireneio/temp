import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import { Spin, Icon } from 'antd';

import { withNamespaces } from '@admin/utils/lib/i18n';
import formatAmount from '@admin/utils/lib/formatAmount';

import styles from './styles.less';

@withNamespaces('dashboard')
class Dashboard extends React.Component {
  static async getInitialProps() {
    return {
      namespacesRequired: ['common', 'dashboard'],
    };
  }

  static propTypes = {
    t: PropTypes.func.isRequired,
    data: PropTypes.shape({}).isRequired,
  };

  formatAmount = amount => {
    const { data } = this.props;
    const currency = data?.viewer?.store.currency;
    return formatAmount({ amount, currency });
  };

  render() {
    const { t, data } = this.props;
    const showPaymentNotice = data?.viewer?.store.unpaidBills?.totalCount > 0;
    const {
      pendingOrder,
      notShipped,
      orderQA,
      productQA,
      userCount,
      orderMonthly,
      revenueMonthly,
      costMonthly,
    } = data?.getDashboardInfo || {};

    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <div className={styles.title}>{t('common:dashboard')}</div>
        </div>
        <div className={styles.content}>
          {showPaymentNotice && (
            <div className={styles.payment}>
              <div className={styles.text}>
                <Icon type="warning" theme="filled" className={styles.icon} />
                <div>
                  <span className={styles.bold}>{t('payment-dealine')}</span>
                  <span>{t('payment-text')}</span>
                </div>
              </div>
              <Link href="/bill-payment">
                <a href="/bill-payment" className={styles.link}>
                  {t('payment-link')}
                </a>
              </Link>
            </div>
          )}
          <div className={styles.welcome}>
            <img
              src="/static/images/dashboard/logo.svg"
              className={styles.logo}
              alt="meepshop"
            />
            <div className={styles.text}>{t('welcome')}</div>
          </div>
          <div className={styles.events}>
            <div>
              <span>{t('pending-order')}</span>
              <span>{pendingOrder}</span>
            </div>
            <div>
              <span>{t('not-shipped')}</span>
              <span>{notShipped}</span>
            </div>
            <div>
              <span>{t('orderQA')}</span>
              <span>{orderQA}</span>
            </div>
            <div>
              <span>{t('productQA')}</span>
              <span>{productQA}</span>
            </div>
          </div>
          <div className={styles.statistics}>
            <div>
              <img src="/static/images/dashboard/revenue.svg" alt="revenue" />
              <div>
                <span>{t('revenue')}</span>
                <span>{this.formatAmount(revenueMonthly)}</span>
              </div>
            </div>
            <div>
              <img src="/static/images/dashboard/cost.svg" alt="cost" />
              <div>
                <span>{t('cost')}</span>
                <span>{this.formatAmount(costMonthly)}</span>
              </div>
            </div>
            <div>
              <img src="/static/images/dashboard/order.svg" alt="order" />
              <div>
                <span>{t('order')}</span>
                <span className={styles.green}>
                  {this.formatAmount(orderMonthly)}
                </span>
              </div>
            </div>
            <div>
              <img src="/static/images/dashboard/member.svg" alt="member" />
              <div>
                <span>{t('member')}</span>
                <span className={styles.green}>
                  {this.formatAmount(userCount)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default props => (
  <Query
    query={gql`
      query getTimezone {
        viewer {
          id
          role
          store {
            timezone
          }
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading || error) return <Spin />;

      const { timezone } = data?.viewer?.store;
      const isMerchant = data?.viewer?.role === 'MERCHANT';
      return (
        <Query
          query={gql`
            query getDashboardInfo($info: DashboardInfoInput) {
              getDashboardInfo(getDashboardInfo: $info) {
                pendingOrder
                notShipped
                orderQA
                productQA
                userCount
                orderMonthly
                revenueMonthly
                costMonthly
              }
              viewer {
                id
                store {
                  currency
                  ${
                    isMerchant
                      ? `
                      unpaidBills {
                        totalCount
                      }
                    `
                      : ''
                  }
                }
              }

            }
          `}
          variables={{
            info: {
              pendingOrder: true,
              notShipped: true,
              orderQA: true,
              productQA: true,
              userCount: true,
              orderMonthly: true,
              revenueMonthly: true,
              costMonthly: true,
              timeRange: {
                start: moment()
                  .utcOffset(parseFloat(timezone))
                  .startOf('month')
                  .format('X'),
                end: moment()
                  .utcOffset(parseFloat(timezone))
                  .endOf('month')
                  .format('X'),
              },
            },
          }}
        >
          {res => {
            if (res.loading || res.error) return <Spin />;

            return <Dashboard data={res.data} {...props} />;
          }}
        </Query>
      );
    }}
  </Query>
);
