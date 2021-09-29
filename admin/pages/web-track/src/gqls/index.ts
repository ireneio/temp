// import
import gql from 'graphql-tag';

// graphql import
import { facebookStoreFragment } from './facebook';
import { googleAnalyticsFragment } from './googleAnalytics';
import { googleAdsFragment } from './googleAds';
import { googleWebmasterFragment } from './googleWebmaster';
import { googleMerchantCenterFragment } from './googleMerchantCenter';
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
        ...googleAdsFragment
        ...googleWebmasterFragment
        ...googleMerchantCenterFragment
        ...googleTagManagerFragment
        ...advancedSettingFragment
      }
    }
  }

  ${facebookStoreFragment}
  ${googleAnalyticsFragment}
  ${googleAdsFragment}
  ${googleWebmasterFragment}
  ${googleMerchantCenterFragment}
  ${googleTagManagerFragment}
  ${advancedSettingFragment}
`;
