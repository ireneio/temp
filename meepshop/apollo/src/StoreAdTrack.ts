// graphql typescript
import { storeAdTrackFbPixelFragment as storeAdTrackFbPixelFragmentType } from './gqls/__generated__/storeAdTrackFbPixelFragment';
import { storeAdTrackGtagFragment as storeAdTrackGtagFragmentType } from './gqls/__generated__/storeAdTrackGtagFragment';
import { storeAdTrackWebTrackFragment as storeAdTrackWebTrackFragmentType } from './gqls/__generated__/storeAdTrackWebTrackFragment';

// typescript definition
interface DefaultDataType {
  getFbPixel?: storeAdTrackFbPixelFragmentType;
  getGtagList?: storeAdTrackGtagFragmentType[];
  getWebTrackList?: {
    data: storeAdTrackWebTrackFragmentType[];
  };
}

/* eslint-disable @typescript-eslint/camelcase */
const gtagKeys = {
  adwords_config: 'googleAdwordsConfig',
  sign_up: 'googleAdwordsSignUp',
  begin_checkout: 'googleAdwordsBeginCheckout',
  purchase: 'googleAdwordsPurchase',
  home_page_conversion: 'googleAdwordsHomePageConversion',
  any_page_conversion: 'googleAdwordsAnyPageConversion',
  first_purchase_conversion: 'googleAdwordsFirstPurchaseConversion',
  tag_manager: 'googleTagManager',
};
/* eslint-enable @typescript-eslint/camelcase */

export const resolvers = {
  Store: {
    adTrack: ({
      getFbPixel,
      getGtagList,
      getWebTrackList,
    }: DefaultDataType) => ({
      __typename: 'StoreAdTrack',
      facebookPixelId: getFbPixel?.pixelId || null,
      googleSearchConsoleVerificationHtmlId: null,
      googleSearchConsoleVerificationHtml: null,
      googleAnalyticsId: null,
      // initialize fields data
      ...Object.values(gtagKeys).reduce(
        (result, key) => ({
          ...result,
          [key]: null,
        }),
        {},
      ),
      ...getGtagList?.reduce((result, data) => {
        if (data?.eventName === 'analytics_config')
          return {
            ...result,
            googleAnalyticsId: data?.trackingId,
          };

        const key = !data?.eventName ? null : gtagKeys[data.eventName];

        return !key
          ? result
          : {
              ...result,
              [key]: data?.trackingId,
            };
      }, {}),
      ...getWebTrackList?.data?.reduce(
        (result, data) =>
          data?.trackType !== 'google_webmaster'
            ? result
            : {
                ...result,
                googleSearchConsoleVerificationHtmlId: data?.id,
                googleSearchConsoleVerificationHtml: data?.trackId,
              },
        {},
      ),
    }),
  },
  User: {
    store: ({
      store,
      getFbPixel,
      getGtagList,
      getWebTrackList,
    }: DefaultDataType & { store?: {} }) =>
      !store
        ? null
        : {
            ...store,
            getFbPixel,
            getGtagList,
            getWebTrackList,
          },
  },
  Query: {
    viewer: ({
      viewer,
      getFbPixel,
      getGtagList,
      getWebTrackList,
    }: DefaultDataType & { viewer?: {} }) =>
      !viewer
        ? null
        : {
            ...viewer,
            getFbPixel,
            getGtagList,
            getWebTrackList,
          },
  },
};
