// typescript import
import { NextPage } from 'next';

// import
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Card, Icon, Tabs } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import { AnalyticsSettingIcon } from '@meepshop/icons';

import Facebook from './Facebook';
import GoogleAnalytics from './GoogleAnalytics';
import GoogleAds from './GoogleAds';
import GoogleWebmaster from './GoogleWebmaster';
import GoogleTagManager from './GoogleTagManager';
import AdvancedSetting from './AdvancedSetting';

import useGtagList from './hooks/useGtagList';
import useWebTrackList from './hooks/useWebTrackList';

import styles from './styles/index.less';

// graphql typescript
import { getWebTrack } from './__generated__/getWebTrack';

// graphql import
import { facebookFbPixelFragment, facebookStoreFragment } from './Facebook';
import { useGtagListFragment } from './hooks/useGtagList';
import { useWebTrackListFragment } from './hooks/useWebTrackList';
import { advancedSettingFragment } from './AdvancedSetting';

// definition
const { TabPane } = Tabs;

const query = gql`
  query getWebTrack {
    viewer {
      id
      store {
        ...advancedSettingFragment
        ...facebookStoreFragment
      }
    }

    getFbPixel {
      ...facebookFbPixelFragment
    }

    getGtagList {
      ...useGtagListFragment
    }

    getWebTrackList {
      data {
        ...useWebTrackListFragment
      }
    }
  }

  ${advancedSettingFragment}
  ${facebookStoreFragment}
  ${facebookFbPixelFragment}
  ${useGtagListFragment}
  ${useWebTrackListFragment}
`;

const WebTrack: NextPage = React.memo(
  (): React.ReactElement => {
    const { t } = useTranslation('web-track');
    const { data } = useQuery<getWebTrack>(query);
    const { gtagList } = useGtagList(data?.getGtagList);
    const { webTrackList } = useWebTrackList(data?.getWebTrackList?.data);

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
                <Facebook
                  pixelId={data?.getFbPixel?.pixelId || null}
                  fbDPALink={data?.viewer?.store?.setting?.fbDPALink || null}
                />
              </TabPane>
              <TabPane tab="Google Analytics" key="googleAnalytics">
                <GoogleAnalytics
                  code={gtagList?.analytics_config?.code || null}
                />
              </TabPane>
              <TabPane tab="Google Ads" key="googleAds">
                <GoogleAds
                  adwordsConfigCode={gtagList?.adwords_config?.code || null}
                  signUpCode={gtagList?.sign_up?.code || null}
                  beginCheckoutCode={gtagList?.begin_checkout?.code || null}
                  purchaseCode={gtagList?.purchase?.code || null}
                />
              </TabPane>
              <TabPane tab={t('google-webmaster.title')} key="googleWebmaster">
                <GoogleWebmaster
                  webTrack={webTrackList?.google_webmaster || null}
                />
              </TabPane>
              <TabPane tab="Google Tag Manager" key="googleTagManager">
                <GoogleTagManager
                  webTrack={webTrackList?.google_tag_manager || null}
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
            <AdvancedSetting store={data?.viewer?.store || null} />
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
