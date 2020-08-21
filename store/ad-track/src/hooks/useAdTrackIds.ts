// import
import { useMemo } from 'react';

// graphql typescript
import {
  getAdTrack,
  getAdTrack_getGtagList as getAdTrackGetGtagList,
} from '../__generated__/getAdTrack';

// definition
const getTrackingId = (
  getGtagList: getAdTrack['getGtagList'] | undefined,
  callback: (data: getAdTrackGetGtagList) => boolean,
): getAdTrackGetGtagList['trackingId'] =>
  getGtagList?.find(callback)?.trackingId || null;

export default (
  data: getAdTrack | undefined,
): {
  fbPixelId: string | null;
  gaId: string | null;
  googleAdsConversionID: string | null;
  googleAdsSignupLabel: string | null;
  googleAdsCheckoutLabel: string | null;
  googleAdsCompleteOrderId: string | null;
} =>
  useMemo(
    () => ({
      fbPixelId: data?.getFbPixel?.pixelId || null,
      gaId: getTrackingId(
        data?.getGtagList,
        ({ type, eventName }: getAdTrackGetGtagList) =>
          type === 'google_analytics' && eventName === 'analytics_config',
      ),
      googleAdsConversionID: getTrackingId(
        data?.getGtagList,
        ({ type, eventName }: getAdTrackGetGtagList) =>
          type === 'google_adwords' && eventName === 'adwords_config',
      ),
      googleAdsSignupLabel: getTrackingId(
        data?.getGtagList,
        ({ type, eventName }: getAdTrackGetGtagList) =>
          type === 'google_adwords' && eventName === 'sign_up',
      ),
      googleAdsCheckoutLabel: getTrackingId(
        data?.getGtagList,
        ({ type, eventName }: getAdTrackGetGtagList) =>
          type === 'google_adwords' && eventName === 'begin_checkout',
      ),
      googleAdsCompleteOrderId: getTrackingId(
        data?.getGtagList,
        ({ type, eventName }: getAdTrackGetGtagList) =>
          type === 'google_adwords' && eventName === 'purchase',
      ),
    }),
    [data],
  );
