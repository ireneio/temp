// typescript import
import { NextPage } from 'next';

// import
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { filter } from 'graphql-anywhere';
import { Spin, Card, Icon, Tabs } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { AnalyticsSettingIcon } from '@meepshop/icons';

// Use to copy mixin.less
import './styles/mixin.less';

import Facebook from './Facebook';
import GoogleAnalytics from './GoogleAnalytics';
import GoogleAds from './GoogleAds';
import GoogleWebmaster from './GoogleWebmaster';
import GoogleMerchantCenter from './GoogleMerchantCenter';
import GoogleTagManager from './GoogleTagManager';
import AdvancedSetting from './AdvancedSetting';

import styles from './styles/index.less';

// graphql typescript
import { getWebTrack as getWebTrackType } from '@meepshop/types/gqls/admin';

// graphql import
import { getWebTrack } from './gqls';
import { facebookStoreFragment } from './gqls/facebook';
import { googleAnalyticsFragment } from './gqls/googleAnalytics';
import { googleAdsStoreFragment } from './gqls/googleAds';
import { googleWebmasterFragment } from './gqls/googleWebmaster';
import { googleMerchantCenterFragment } from './gqls/googleMerchantCenter';
import { googleTagManagerFragment } from './gqls/googleTagManager';
import { advancedSettingFragment } from './gqls/advancedSetting';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
}

// definition
const { TabPane } = Tabs;
const WebTrack: NextPage<PropsType> = React.memo(
  (): React.ReactElement => {
    const { t } = useTranslation('web-track');
    const { data } = useQuery<getWebTrackType>(getWebTrack);
    const store = data?.viewer?.store;

    if (!store) return <Spin indicator={<Icon type="loading" spin />} />;

    return (
      <div className={styles.root}>
        <div className={styles.header}>{t('ad-analytics')}</div>

        <div className={styles.content}>
          <Card
            title={
              <>
                <AnalyticsSettingIcon />

                <div>{t('track-setting')}</div>
              </>
            }
          >
            <Tabs defaultActiveKey="facebook" tabPosition="left">
              <TabPane tab="Facebook" key="facebook">
                <Facebook store={filter(facebookStoreFragment, store)} />
              </TabPane>

              <TabPane tab="Google Analytics" key="googleAnalytics">
                <GoogleAnalytics
                  store={filter(googleAnalyticsFragment, store)}
                />
              </TabPane>

              <TabPane tab="Google Ads" key="googleAds">
                <GoogleAds store={filter(googleAdsStoreFragment, store)} />
              </TabPane>

              <TabPane tab={t('google-webmaster.title')} key="googleWebmaster">
                <GoogleWebmaster
                  store={filter(googleWebmasterFragment, store)}
                />
              </TabPane>

              <TabPane
                tab={t('google-merchant-center.title')}
                key="googleMerchantCenter"
              >
                <GoogleMerchantCenter
                  store={filter(googleMerchantCenterFragment, store)}
                />
              </TabPane>

              <TabPane tab="Google Tag Manager" key="googleTagManager">
                <GoogleTagManager
                  store={filter(googleTagManagerFragment, store)}
                />
              </TabPane>
            </Tabs>
          </Card>

          <Card
            title={
              <>
                <Icon type="line-chart" />
                <div>{t('advanced-customer-track')}</div>
              </>
            }
          >
            <AdvancedSetting store={filter(advancedSettingFragment, store)} />
          </Card>
        </div>
      </div>
    );
  },
);

WebTrack.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default WebTrack;
