// typescript import
import { NextPage } from 'next';

// import
import React, { useContext } from 'react';
import { filter } from 'graphql-anywhere';
import { useQuery } from '@apollo/react-hooks';
import Head from 'next/head';
import { Spin, Icon } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';
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
    const { c } = useContext(CurrencyContext);
    const { t } = useTranslation('dashboard');
    const { data } = useQuery<getDashboardType>(getDashboard);

    const { viewer, getDashboardInfo } = data || {};

    if (!viewer?.id || !getDashboardInfo)
      return <Spin indicator={<Icon type="loading" spin />} />;

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
      <>
        <Head>
          {/* <!-- Facebook Pixel Code --> */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '222744027936443');
                fbq('track', 'PageView');
              `,
            }}
          />
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
                <img height="1" width="1" style="display:none"
                  src="https://www.facebook.com/tr?id=222744027936443&ev=PageView&noscript=1"
                />
              `,
            }}
          />
          {/* <!-- End Facebook Pixel Code --> */}

          {/* <!-- Global site tag (gtag.js) - Google AdWords: 986719315 --> */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=AW-986719315"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'AW-986719315');
              `,
            }}
          />
          {/* <!-- End Global site tag (gtag.js) - Google AdWords: 986719315 --> */}
        </Head>

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
      </>
    );
  },
);

Dashboard.getInitialProps = async () => ({
  namespacesRequired: ['dashboard'],
});

export default Dashboard;
