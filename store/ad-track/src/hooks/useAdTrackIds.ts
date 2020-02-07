// import
import { useMemo } from 'react';

// graphql typescript
import {
  getAdTrack,
  getAdTrack_getGtagList as getAdTrackGetGtagList,
} from '../__generated__/getAdTrack';

// definition
const getCode = (
  getGtagList: getAdTrack['getGtagList'] | undefined,
  callback: (data: getAdTrackGetGtagList) => boolean,
): getAdTrackGetGtagList['code'] => getGtagList?.find(callback)?.code || null;

const getMatch = (
  code: getAdTrackGetGtagList['code'],
  reg: RegExp,
): string | null => code?.match(reg)?.[0] || null;

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
      gaId: getCode(
        data?.getGtagList,
        ({ type, eventName }: getAdTrackGetGtagList) =>
          type === 'google_analytics' && eventName === 'analytics_config',
      ),
      googleAdsConversionID: getMatch(
        getCode(
          data?.getGtagList,
          ({ type, eventName }: getAdTrackGetGtagList) =>
            type === 'google_adwords' && eventName === 'adwords_config',
        ),
        /AW-[0-9]*(?='\);)/gm,
      ),
      googleAdsSignupLabel: getMatch(
        getCode(
          data?.getGtagList,
          ({ type, eventName }: getAdTrackGetGtagList) =>
            type === 'google_adwords' && eventName === 'sign_up',
        ),
        /AW-.*(?='}\);)/gm,
      ),
      googleAdsCheckoutLabel: getMatch(
        getCode(
          data?.getGtagList,
          ({ type, eventName }: getAdTrackGetGtagList) =>
            type === 'google_adwords' && eventName === 'begin_checkout',
        ),
        /AW-.*(?='}\);)/gm,
      ),
      googleAdsCompleteOrderId: getMatch(
        getCode(
          data?.getGtagList,
          ({ type, eventName }: getAdTrackGetGtagList) =>
            type === 'google_adwords' && eventName === 'purchase',
        ),
        /AW-.*(?='}\);)/gm,
      ),
    }),
    [data],
  );
