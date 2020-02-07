// import
import React from 'react';
import Link from 'next/link';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';
import { useQuery } from '@apollo/react-hooks';
import { Spin, Icon } from 'antd';
import moment from 'moment';

import { useTranslation } from '@admin/utils/lib/i18n';
import formatAmount from '@admin/utils/lib/formatAmount';

import Tutorial from './tutorial';
import styles from './styles/index.less';

// graphql typescript
import { getTimezone } from './__generated__/getTimezone';
import {
  getDashboard,
  getDashboardVariables,
} from './__generated__/getDashboard';

// graphql import
import { tutorialSettingObjectTypeFragment } from './tutorial';

// definition
const Dashboard = (): React.ReactElement => {
  const getTimezoneResult = useQuery<getTimezone>(
    gql`
      query getTimezone {
        viewer {
          id
          store {
            id
            timezone
          }
        }
      }
    `,
  );

  const timezone = getTimezoneResult.data?.viewer?.store?.timezone;

  const getDashboardResult = useQuery<getDashboard, getDashboardVariables>(
    gql`
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
            description {
              name
            }
            unpaidBills {
              totalCount
            }
            setting {
              ...tutorialSettingObjectTypeFragment
            }
          }
        }
      }
      ${tutorialSettingObjectTypeFragment}
    `,
    {
      skip: !timezone,
      variables: {
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
              .utcOffset(parseFloat(timezone || '+8'))
              .startOf('month')
              .format('X'),
            end: moment()
              .utcOffset(parseFloat(timezone || '+8'))
              .endOf('month')
              .format('X'),
          },
        },
      },
    },
  );

  const { t } = useTranslation('dashboard');

  if (
    getDashboardResult.loading ||
    getDashboardResult.error ||
    getTimezoneResult.loading ||
    getTimezoneResult.error
  )
    return <Spin indicator={<Icon type="loading" spin />} />;

  const reformatAmount = (amount: number | null): string => {
    if (amount === null) return '';

    const currency = getDashboardResult.data?.viewer?.store?.currency;

    return formatAmount({ amount, currency });
  };

  const { viewer, getDashboardInfo } = getDashboardResult.data || {};
  const isUnpaidBillsDisplayed =
    viewer?.role === 'MERCHANT' &&
    (viewer?.store?.unpaidBills?.totalCount || 0) > 0;
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
      <div className={styles.content}>
        <Tutorial
          name={viewer?.store?.description?.name}
          id={viewer?.store?.id || ''}
          setting={filter(
            tutorialSettingObjectTypeFragment,
            viewer?.store?.setting,
          )}
        />
        {isUnpaidBillsDisplayed ? (
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
            <img src="/images/dashboard/revenue.svg" alt="revenue" />
            <div>
              <span>{t('revenue')}</span>
              <span>{reformatAmount(revenueMonthly)}</span>
            </div>
          </div>
          <div>
            <img src="/images/dashboard/cost.svg" alt="cost" />
            <div>
              <span>{t('cost')}</span>
              <span>{reformatAmount(costMonthly)}</span>
            </div>
          </div>
          <div>
            <img src="/images/dashboard/order.svg" alt="order" />
            <div>
              <span>{t('order')}</span>
              <span className={styles.green}>{orderMonthly}</span>
            </div>
          </div>
          <div>
            <img src="/images/dashboard/member.svg" alt="member" />
            <div>
              <span>{t('member')}</span>
              <span className={styles.green}>{userCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Dashboard.getInitialProps = async () => ({
  namespacesRequired: ['dashboard'],
});

export default Dashboard;
