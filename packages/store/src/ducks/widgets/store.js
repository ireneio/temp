import * as Utils from 'utils';

/* ****************************************** 商店基本資料與設定 ****************************************** */
const GET_STORE_SUCCESS = 'GET_STORE_SUCCESS';
const GET_STORE_FAILURE = 'GET_STORE_FAILURE';

export const getStoreSuccess = payload => ({
  type: GET_STORE_SUCCESS,
  payload,
});
export const getStoreFailure = payload => ({
  type: GET_STORE_FAILURE,
  payload,
});

/* ****************************************** 更改幣值 ****************************************** */
const SET_CURRENCY = 'SET_CURRENCY';
/**
 * @param {String} id 幣值代號，如：'TWD', 'USD'
 */
export const setCurrency = id => ({
  type: SET_CURRENCY,
  payload: id,
});

/**
 * @name StoreReducer
 * @description 存放商店資料，語言，幣值
 */
const initialState = {
  activities: [],
  menus: [],
  color: {},
  memberGroups: [],
  settings: {},
  experiment: {},
};

const getPageAdTrackIds = data => {
  /* FB Pixel */
  const fbPixelId = data?.getFbPixel?.pixelId || null;

  const gtagList = data?.getGtagList || [];
  /* Google analytics */
  const gaData = gtagList.find(
    ({ type, eventName }) =>
      type === 'google_analytics' && eventName === 'analytics_config',
  );
  const gaID = (gaData && gaData.code) || null;
  /* Google Ads conversion ID */
  const googleAdsConfigData = gtagList.find(
    ({ type, eventName }) =>
      type === 'google_adwords' && eventName === 'adwords_config',
  );
  const googleAdsConversionID =
    (googleAdsConfigData?.code || '').match(/AW-[0-9]*(?='\);)/gm)?.[0] || null;
  /* Google Ads conversion Label - Signup */
  const googleAdsSignupData = gtagList.find(
    ({ type, eventName }) =>
      type === 'google_adwords' && eventName === 'sign_up',
  );
  const googleAdsSignupLabel =
    (googleAdsSignupData?.code || '').match(/AW-.*(?='}\);)/gm)?.[0] || null;
  /* Google Ads conversion Label - Checkout */
  const googleAdsCheckoutData = gtagList.find(
    ({ type, eventName }) =>
      type === 'google_adwords' && eventName === 'begin_checkout',
  );
  const googleAdsCheckoutLabel =
    (googleAdsCheckoutData?.code || '').match(/AW-.*(?='}\);)/gm)?.[0] || null;
  /* Google Ads conversion Label - CompleteOrder */
  const googleAdsCompleteOrderData = gtagList.find(
    ({ type, eventName }) =>
      type === 'google_adwords' && eventName === 'purchase',
  );
  const googleAdsCompleteOrderLabel =
    (googleAdsCompleteOrderData?.code || '').match(/AW-.*(?='}\);)/gm)?.[0] ||
    null;

  const webTrackList = data?.getWebTrackList?.data || [];
  let webMasterID = null;
  let gtmID = null;
  if (webTrackList) {
    webTrackList.forEach(webTrack => {
      switch (webTrack?.trackType) {
        case 'google_webmaster': {
          webMasterID = webTrack?.trackId || null;
          break;
        }
        case 'google_tag_manager': {
          gtmID =
            (webTrack?.trackPage?.[0]?.trackCode || '').match(
              /GTM-.*(?=('\)|"))/gm,
            )?.[0] || null;
          break;
        }
        default:
          break;
      }
    });
  }
  return {
    fbPixelId,
    gaID,
    webMasterID,
    gtmID,
    googleAdsConversionID,
    googleAdsSignupLabel,
    googleAdsCheckoutLabel,
    googleAdsCompleteOrderLabel,
  };
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_STORE_SUCCESS: {
      const { data, customerCurrency /* from cookie */ } = payload;
      const activities = data?.getActivityList?.data || [];
      const menus = (data?.getMenuList?.data || []).map(menu =>
        Utils.setDefaultValueForMenuDesign(menu),
      );
      const memberGroups = data?.viewer?.store?.memberGroups || [];
      const store = data?.viewer?.store;
      const storeSettings = data?.viewer?.store?.setting;
      const pageAdTrackIDs = getPageAdTrackIds(data);
      const {
        locale: localeOptions,
        currency: currencyOptions,
      } = storeSettings;

      const settings = {
        ...storeSettings,
        backgroundImage: data?.getColorList?.data?.[0]?.imgInfo,
        storeName: store?.description?.name || '',
        storeDescription: store?.description?.introduction || '',
        cname: store.cname,
        domain: store.domain,
        faviconUrl: store?.faviconImage?.src || '',
        logoUrl: store?.logoImage?.src || '',
        mobileLogoUrl: store?.mobileLogoImage?.src || '',
        homePageId: store.homePageId,
        localeOptions: localeOptions || ['zh_TW'], // 用於語系選單
        storeCurrency: store.currency || 'TWD', // 幣值轉換欲轉換成的幣值
        customerCurrency: customerCurrency || currencyOptions?.[0] || 'TWD', // default currency
        currencyOptions: currencyOptions || ['TWD'], // 用於幣值選單
      };

      return {
        shippableCountries: store?.shippableCountries || [],
        activities, // 折扣活動
        menus, // 選單
        memberGroups,
        settings,
        pageAdTrackIDs,
        experiment: store?.experiment || {},
      };
    }
    case GET_STORE_FAILURE: {
      const error = payload;
      return { error };
    }
    /* 更改幣值 */
    case SET_CURRENCY: {
      const { settings } = state;
      return { ...state, settings: { ...settings, customerCurrency: payload } };
    }
    default:
      return state;
  }
};
