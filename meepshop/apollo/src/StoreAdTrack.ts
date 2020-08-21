// import
import gql from 'graphql-tag';

// graphql typescript
import { storeAdTrackFbPixelFragment as storeAdTrackFbPixelFragmentType } from './__generated__/storeAdTrackFbPixelFragment';
import { storeAdTrackGtagFragment as storeAdTrackGtagFragmentType } from './__generated__/storeAdTrackGtagFragment';
import { storeAdTrackWebTrackFragment as storeAdTrackWebTrackFragmentType } from './__generated__/storeAdTrackWebTrackFragment';

// typescript definition
interface DefaultDataType {
  getFbPixel: storeAdTrackFbPixelFragmentType;
  getGtagList: (storeAdTrackGtagFragmentType & {
    code?: string;
  })[];
  getWebTrackList: {
    data: storeAdTrackWebTrackFragmentType[];
  };
}

// definition
export const storeAdTrackFbPixelFragment = gql`
  fragment storeAdTrackFbPixelFragment on FbPixel {
    pixelId
  }
`;

export const storeAdTrackGtagFragment = gql`
  fragment storeAdTrackGtagFragment on gtag {
    eventName
    trackingId
  }
`;

export const storeAdTrackWebTrackFragment = gql`
  fragment storeAdTrackWebTrackFragment on WebTrack {
    id
    trackType
    trackId
  }
`;

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
      facebookPixelId: getFbPixel?.pixelId,
      // initialize fields data
      ...Object.values(gtagKeys).reduce(
        (result, key) => ({
          ...result,
          [key]:
            key === 'googleAnalyticsId'
              ? null
              : {
                  __typename: 'AdTrackCode',
                  raw: null,
                  extractedId: null,
                },
        }),
        {
          googleSearchConsoleVerificationHtmlId: null,
          googleSearchConsoleVerificationHtml: null,
        },
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
              [key]: {
                __typename: 'AdTrackCode',
                raw: data?.code,
                extractedId: data?.trackingId,
              },
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
    }: DefaultDataType & { store: {} }) => ({
      ...store,
      getFbPixel,
      getGtagList,
      getWebTrackList,
    }),
  },
  Query: {
    viewer: ({
      viewer,
      getFbPixel,
      getGtagList,
      getWebTrackList,
    }: DefaultDataType & { viewer: {} }) => ({
      ...viewer,
      getFbPixel,
      getGtagList,
      getWebTrackList,
    }),
  },
};
