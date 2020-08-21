// typescript import
import { NextPage } from 'next';

// import
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';
import { Spin, Card, Icon, Tabs } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import { AnalyticsSettingIcon } from '@meepshop/icons';

import Facebook from './Facebook';
import GoogleAnalytics from './GoogleAnalytics';
import GoogleAds from './GoogleAds';
import GoogleWebmaster from './GoogleWebmaster';
import GoogleTagManager from './GoogleTagManager';
import AdvancedSetting from './AdvancedSetting';

import styles from './styles/index.less';

// graphql typescript
import { getWebTrack } from './__generated__/getWebTrack';

// graphql import
import {
  storeAdTrackFbPixelFragment,
  storeAdTrackGtagFragment,
  storeAdTrackWebTrackFragment,
} from '@meepshop/apollo/lib/StoreAdTrack';

import { facebookStoreFragment } from './Facebook';
import { googleAnalyticsFragment } from './GoogleAnalytics';
import { googleAdsFragment } from './GoogleAds';
import { googleWebmasterFragment } from './GoogleWebmaster';
import { googleTagManagerFragment } from './GoogleTagManager';
import { advancedSettingFragment } from './AdvancedSetting';

// definition
const { TabPane } = Tabs;

const query = gql`
  query getWebTrack {
    viewer {
      id
      store {
        ...facebookStoreFragment
        ...googleAnalyticsFragment
        ...googleAdsFragment
        ...googleWebmasterFragment
        ...googleTagManagerFragment
        ...advancedSettingFragment
      }
    }

    getFbPixel {
      ...storeAdTrackFbPixelFragment
    }

    getGtagList {
      ...storeAdTrackGtagFragment
      code
    }

    getWebTrackList {
      data {
        ...storeAdTrackWebTrackFragment
      }
    }
  }

  ${storeAdTrackFbPixelFragment}
  ${storeAdTrackGtagFragment}
  ${storeAdTrackWebTrackFragment}
  ${facebookStoreFragment}
  ${googleAnalyticsFragment}
  ${googleAdsFragment}
  ${googleWebmasterFragment}
  ${googleTagManagerFragment}
  ${advancedSettingFragment}
`;

const WebTrack: NextPage = React.memo(
  (): React.ReactElement => {
    const { t } = useTranslation('web-track');
    const { data } = useQuery<getWebTrack>(query);
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
                <GoogleAds store={filter(googleAdsFragment, store)} />
              </TabPane>
              <TabPane tab={t('google-webmaster.title')} key="googleWebmaster">
                <GoogleWebmaster
                  store={filter(googleWebmasterFragment, store)}
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
  namespacesRequired: ['web-track'],
});

export default WebTrack;
