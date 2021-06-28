// typescript import
import { NextPage } from 'next';

// import
import React, { useContext, useEffect } from 'react';
import { filter } from 'graphql-anywhere';
import { useQuery } from '@apollo/react-hooks';
import { LoadingOutlined, WarningFilled } from '@ant-design/icons';
import { Spin } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { AdTrackContext } from '@admin/ad-track';
import { Currency as CurrencyContext } from '@meepshop/context';
import {
  dashboardRevenue_w40 as dashboardRevenue,
  dashboardEmail_w40 as dashboardEmail,
  dashboardOrder_w40 as dashboardOrder,
  dashboardMember_w40 as dashboardMember,
} from '@meepshop/images';
import Link from '@meepshop/link';

import Tutorial from './Tutorial';
import styles from './styles/index.less';

// graphql typescript
import { getDashboard as getDashboardType } from '@meepshop/types/gqls/admin';

// graphql import
import { getDashboard } from './gqls';
import { tutorialSettingObjectTypeFragment } from './gqls/tutorial';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
}

// definition
const Dashboard: NextPage<PropsType> = React.memo(
  (): React.ReactElement => {
    const adTrack = useContext(AdTrackContext);
    const { c } = useContext(CurrencyContext);
    const { t } = useTranslation('dashboard');
    const { data } = useQuery<getDashboardType>(getDashboard);

    const { viewer, getDashboardInfo } = data || {};

    useEffect(() => {
      adTrack.pageView();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!viewer?.id || !getDashboardInfo)
      return <Spin indicator={<LoadingOutlined spin />} />;

    const isUnpaidBillsDisplayed =
      viewer.role === 'MERCHANT' &&
      (viewer.store?.unpaidBills?.totalCount || 0) > 0;
    const {
      pendingOrder = null,
      notShipped = null,
      orderQA = null,
      productQA = null,
      userCount = null,
      orderMonthly = null,
      revenueMonthly = null,
      numberOfReminderSentMonthly = null,
    } = getDashboardInfo;

    return (
      <div className={styles.root}>
        <div className={styles.content}>
          <Tutorial
            name={viewer.store?.description?.name}
            id={viewer.store?.id || ''}
            setting={filter(
              tutorialSettingObjectTypeFragment,
              viewer.store?.setting,
            )}
          />
          {isUnpaidBillsDisplayed ? (
            <div className={styles.payment}>
              <div className={styles.text}>
                <WarningFilled className={styles.icon} />
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
              <img src={dashboardRevenue} alt="revenue" />
              <div>
                <span>{t('revenue')}</span>
                <span>{c(revenueMonthly || 0)}</span>
              </div>
            </div>

            <div>
              <img src={dashboardOrder} alt="order" />
              <div>
                <span>{t('order')}</span>
                <span>{orderMonthly}</span>
              </div>
            </div>

            <div>
              <img src={dashboardMember} alt="member" />
              <div>
                <span>{t('member')}</span>
                <span className={styles.green}>{userCount}</span>
              </div>
            </div>

            <div>
              <img src={dashboardEmail} alt="email" />
              <div>
                <span>{t('numberOfReminderSentMonthly')}</span>
                <span className={styles.green}>
                  {numberOfReminderSentMonthly}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

Dashboard.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default Dashboard;
