// typescript import
import { I18nPropsType } from '@admin/utils/lib/i18n';

// import
import React from 'react';
import Link from 'next/link';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { Spin, Icon } from 'antd';
import moment from 'moment';
import idx from 'idx';

import { withNamespaces } from '@admin/utils/lib/i18n';
import formatAmount from '@admin/utils/lib/formatAmount';

import styles from './styles/index.less';

// graphql typescript
import { getTimezone } from './__generated__/getTimezone';
import {
  getDashboard,
  getDashboardVariables,
  getDashboard_viewer as getDashboardInfoViewer,
  getDashboard_getDashboardInfo as getDashboardInfoGetDashboardInfo,
} from './__generated__/getDashboard';

// typescript definition
interface PropsType extends I18nPropsType {
  viewer: getDashboardInfoViewer;
  getDashboardInfo: getDashboardInfoGetDashboardInfo;
}

// definition
class Dashboard extends React.Component<PropsType> {
  private formatAmount = (amount: number | null) => {
    if (amount === null) return '';

    const { viewer } = this.props;
    const currency = idx(viewer, _ => _.store.currency);

    return formatAmount({ amount, currency });
  };

  public render(): React.ReactNode {
    const { t, viewer, getDashboardInfo } = this.props;
    const shouldShowUnpaidBills =
      viewer.role === 'MERCHANT' &&
      (idx(viewer, _ => _.store.unpaidBills.totalCount) || 0) > 0;
    const {
      pendingOrder = null,
      notShipped = null,
      orderQA = null,
      productQA = null,
      userCount = null,
      orderMonthly = null,
      revenueMonthly = null,
      costMonthly = null,
    } = getDashboardInfo || {};

    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <div className={styles.title}>{t('common:dashboard')}</div>
        </div>
        <div className={styles.content}>
          {shouldShowUnpaidBills ? (
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
          ) : null}
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
                <span className={styles.green}>{orderMonthly}</span>
              </div>
            </div>
            <div>
              <img src="/static/images/dashboard/member.svg" alt="member" />
              <div>
                <span>{t('member')}</span>
                <span className={styles.green}>{userCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const EnhancedDashboard = withNamespaces('dashboard')(Dashboard);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const DashboardPage = () => (
  <Query<getTimezone>
    query={gql`
      query getTimezone {
        viewer {
          id
          store {
            id
            timezone
          }
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading || error)
        return <Spin indicator={<Icon type="loading" spin />} />;

      const timezone = idx(data, _ => _.viewer.store.timezone) || '+8';

      return (
        <Query<getDashboard, getDashboardVariables>
          query={gql`
            query getDashboard($info: DashboardInfoInput) {
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
                role
                store {
                  id
                  currency
                  unpaidBills {
                    totalCount
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
            if (res.loading || res.error)
              return <Spin indicator={<Icon type="loading" spin />} />;

            return (
              <EnhancedDashboard
                {...(res.data as Pick<
                  PropsType,
                  'getDashboardInfo' | 'viewer'
                >)}
              />
            );
          }}
        </Query>
      );
    }}
  </Query>
);

DashboardPage.getInitialProps = async () => ({
  namespacesRequired: ['dashboard'],
});

export default DashboardPage;
