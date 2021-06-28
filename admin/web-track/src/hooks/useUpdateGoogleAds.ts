// import
import { useCallback } from 'react';

import useSetGtagSettingsList from './useSetGtagSettingsList';
import parseGoogleAdwordsConfig from '../utils/parseGoogleAdwordsConfig';
import parseGoogleAdsCode from '../utils/parseGoogleAdsCode';

// graphql typescript
import {
  gtagTypeEnum,
  gtagEventNameEnum,
  useUpdateGoogleAdsFragment as useUpdateGoogleAdsFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { useUpdateGoogleAdsFragment } from '../gqls/useUpdateGoogleAds';

// typescript definition
export interface ValuesType {
  googleAdwordsConfig: string | null;
  googleAdwordsSignUp: string | null;
  googleAdwordsBeginCheckout: string | null;
  googleAdwordsPurchase: string | null;
}

// definition
export default (
  id: string | null,
  setEditMode: (editMode: boolean) => void,
): ((values: ValuesType) => void) => {
  const setGtagSettingsList = useSetGtagSettingsList((cache, data) => {
    cache.writeFragment<useUpdateGoogleAdsFragmentType>({
      id: id || 'null-id' /* SHOULD_NOT_BE_NULL */,
      fragment: useUpdateGoogleAdsFragment,
      data: {
        __typename: 'Store',
        id: id || 'null-id' /* SHOULD_NOT_BE_NULL */,
        adTracks: {
          __typename: 'AdTracks',
          googleAdwordsConfig:
            data?.setGtagSettingsList?.find(
              gtag => gtag?.eventName === 'adwords_config',
            )?.trackingId || null,
          googleAdwordsSignUp:
            data?.setGtagSettingsList?.find(
              gtag => gtag?.eventName === 'sign_up',
            )?.trackingId || null,
          googleAdwordsBeginCheckout:
            data?.setGtagSettingsList?.find(
              gtag => gtag?.eventName === 'begin_checkout',
            )?.trackingId || null,
          googleAdwordsPurchase:
            data?.setGtagSettingsList?.find(
              gtag => gtag?.eventName === 'purchase',
            )?.trackingId || null,
        },
      },
    });
  });

  return useCallback(
    async ({
      googleAdwordsConfig,
      googleAdwordsSignUp,
      googleAdwordsBeginCheckout,
      googleAdwordsPurchase,
    }) => {
      await setGtagSettingsList({
        variables: {
          setInput: [
            {
              type: 'google_adwords' as gtagTypeEnum,
              eventName: 'adwords_config' as gtagEventNameEnum,
              trackingId: parseGoogleAdwordsConfig(googleAdwordsConfig),
            },
            {
              type: 'google_adwords' as gtagTypeEnum,
              eventName: 'sign_up' as gtagEventNameEnum,
              trackingId: parseGoogleAdsCode(googleAdwordsSignUp),
            },
            {
              type: 'google_adwords' as gtagTypeEnum,
              eventName: 'begin_checkout' as gtagEventNameEnum,
              trackingId: parseGoogleAdsCode(googleAdwordsBeginCheckout),
            },
            {
              type: 'google_adwords' as gtagTypeEnum,
              eventName: 'purchase' as gtagEventNameEnum,
              trackingId: parseGoogleAdsCode(googleAdwordsPurchase),
            },
          ],
        },
      });
      setEditMode(false);
    },
    [setEditMode, setGtagSettingsList],
  );
};
