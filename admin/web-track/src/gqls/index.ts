// import
import gql from 'graphql-tag';

// graphql import
import { facebookStoreFragment } from './facebook';
import { googleAnalyticsFragment } from './googleAnalytics';
import { googleAdsStoreFragment } from './googleAds';
import { googleWebmasterFragment } from './googleWebmaster';
import { googleTagManagerFragment } from './googleTagManager';
import { advancedSettingFragment } from './advancedSetting';

// definition
export const getWebTrack = gql`
  query getWebTrack {
    viewer {
      id
      store {
        ...facebookStoreFragment
        ...googleAnalyticsFragment
        ...googleAdsStoreFragment
        ...googleWebmasterFragment
        ...googleTagManagerFragment
        ...advancedSettingFragment
      }
    }
  }

  ${facebookStoreFragment}
  ${googleAnalyticsFragment}
  ${googleAdsStoreFragment}
  ${googleWebmasterFragment}
  ${googleTagManagerFragment}
  ${advancedSettingFragment}
`;