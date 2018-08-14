import * as Utils from 'utils';
import { DEFAULT_COLORS } from 'template';

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

/* ****************************************** 更改語系 ****************************************** */
const SET_LOCALE = 'SET_LOCALE';
/**
 * @param {String} id 語言代號，如：'zh_TW', 'en_US'
 */
export const setLocale = id => ({
  type: SET_LOCALE,
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
  apps: [],
  memberGroups: [],
  appLogins: [],
  settings: {},
};

const getPageAdTrackIds = data => {
  /* FB Pixel */
  const fbPixelId =
    (Utils.getIn(['getFbPixel', 'active'])(data) &&
      Utils.getIn(['getFbPixel', 'pixelId'])(data)) ||
    null;

  const gtagList = Utils.getIn(['getGtagList'])(data) || [];
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
    (googleAdsConfigData &&
      googleAdsConfigData.active &&
      typeof googleAdsConfigData.code === 'string' &&
      googleAdsConfigData.code.match(/AW-[0-9]*(?='\);)/gm) &&
      googleAdsConfigData.code.match(/AW-[0-9]*(?='\);)/gm)[0]) ||
    null;
  /* Google Ads conversion Label - Signup */
  const googleAdsSignupData = gtagList.find(
    ({ type, eventName }) =>
      type === 'google_adwords' && eventName === 'sign_up',
  );
  const googleAdsSignupLabel =
    (googleAdsSignupData &&
      googleAdsSignupData.active &&
      typeof googleAdsSignupData.code === 'string' &&
      googleAdsSignupData.code.match(/AW-.*(?='}\);)/gm) &&
      googleAdsSignupData.code.match(/AW-.*(?='}\);)/gm)[0]) ||
    null;
  /* Google Ads conversion Label - Checkout */
  const googleAdsCheckoutData = gtagList.find(
    ({ type, eventName }) =>
      type === 'google_adwords' && eventName === 'begin_checkout',
  );
  const googleAdsCheckoutLabel =
    (googleAdsCheckoutData &&
      googleAdsCheckoutData.active &&
      typeof googleAdsCheckoutData.code === 'string' &&
      googleAdsCheckoutData.code.match(/AW-.*(?='}\);)/gm) &&
      googleAdsCheckoutData.code.match(/AW-.*(?='}\);)/gm)[0]) ||
    null;
  /* Google Ads conversion Label - CompleteOrder */
  const googleAdsCompleteOrderData = gtagList.find(
    ({ type, eventName }) =>
      type === 'google_adwords' && eventName === 'purchase',
  );
  const googleAdsCompleteOrderLabel =
    (googleAdsCompleteOrderData &&
      googleAdsCompleteOrderData.active &&
      typeof googleAdsCompleteOrderData.code === 'string' &&
      googleAdsCompleteOrderData.code.match(/AW-.*(?='}\);)/gm) &&
      googleAdsCompleteOrderData.code.match(/AW-.*(?='}\);)/gm)[0]) ||
    null;

  const webTrackList = Utils.getIn(['getWebTrackList', 'data'])(data);
  let webMasterID = null;
  let gtmID = null;
  if (webTrackList) {
    webTrackList.forEach(webTrack => {
      const { trackType } = webTrack;
      if (trackType === 'google_webmaster') {
        webMasterID = webTrack.trackId;
      } else if (trackType === 'google_tag_manager') {
        gtmID =
          (Utils.getIn(['trackPage', 0, 'status'])(webTrack) &&
            Utils.getIn(['trackPage', 0, 'codeInfo', 'id'])(webTrack)) ||
          null;
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

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case GET_STORE_SUCCESS: {
      const { data, locale, customerCurrency } = payload;
      const activities = Utils.getIn(['getActivityList', 'data'])(data);
      const menus = (Utils.getIn(['getMenuList', 'data'])(data) || []).map(
        menu => Utils.setDefaultValueForMenuDesign(menu),
      );
      const colorPlan =
        Utils.getIn(['getColorList', 'data', 0])(data) || DEFAULT_COLORS;
      const { colors } = colorPlan.themes[+colorPlan.selected];
      const apps = Utils.getIn(['getStoreAppList', 'data'])(data);
      const memberGroups = Utils.getIn(['getMemberGroupList', 'data'])(data);
      const appLogins = Utils.getIn(['getAppLoginList', 'data'])(data);
      const store = Utils.getIn(['getStoreList', 'data', 0])(data);
      const storeSettings = Utils.getIn(['getStoreList', 'data', 0, 'setting'])(
        data,
      );
      const pageAdTrackIDs = getPageAdTrackIds(data);
      const fxSetup = Utils.getIn(['getExchangeRateList', 'data'])(data);
      const {
        locale: localeOptions,
        currency: currencyOptions,
        activityVersion,
        lockedCountry,
      } = storeSettings;
      const invoice = Utils.getIn(['invoice'])(storeSettings) || {
        donate: { status: false, units: null },
        duplicate: { status: false },
        eInvoice: { status: false },
        triplicate: { status: false },
      };

      const settings = {
        ...storeSettings,
        backgroundImage: colorPlan.imgInfo,
        storeName: Utils.getIn(['description', 'name'])(store),
        storeDescription: Utils.getIn(['description', 'introduction'])(store),
        cname: store.cname,
        domain: store.domain,
        faviconUrl: Utils.getIn(['faviconFileInfo', 'image'])(store),
        logoUrl: Utils.getIn(['logoFileInfo', 'image'])(store),
        mobileLogoUrl: Utils.getIn(['mobileLogoFileInfo', 'image'])(store),
        homePageId: store.homePageId,
        /* FIXME: how to decide default locale */
        locale:
          locale ||
          (localeOptions && localeOptions.length === 1 && localeOptions[0]) ||
          'zh_TW',
        localeOptions: localeOptions || ['zh_TW'], // 用於語系選單
        lockedCountry: lockedCountry || [],
        storeCurrency: store.currency || 'TWD', // 幣值轉換欲轉換成的幣值
        /* FIXME: how to decide default currency */
        customerCurrency:
          customerCurrency ||
          (currencyOptions &&
            currencyOptions.length === 1 &&
            currencyOptions[0]) ||
          'TWD', // 前台顯示的幣值
        fxSetup, // 用於匯率轉換 customerCurrency ==> storeCurrency
        currencyOptions: currencyOptions || ['TWD'], // 用於幣值選單
        activityVersion,
        invoice: {
          donate: {
            status: invoice.donate ? !!invoice.donate.status : false,
            units: invoice.donate ? invoice.donate.units : 0,
          },
          duplicate: {
            status: invoice.duplicate ? !!invoice.duplicate.status : false,
          },
          eInvoice: {
            status: invoice.eInvoice ? !!invoice.eInvoice.status : false,
          },
          triplicate: {
            status: invoice.triplicate ? !!invoice.triplicate.status : false,
          },
        },
      };
      return {
        activities, // 折扣活動
        menus, // 選單
        colors, // 色彩計畫
        apps: apps.map(app => ({ ...app, isInstalled: !!app.isInstalled })), // 用於判斷擴充功能是否安裝
        memberGroups,
        appLogins, // 第三方應用 ex. fb login
        settings,
        pageAdTrackIDs,
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
    /* 更改語系 */
    case SET_LOCALE: {
      const { settings } = state;
      return { ...state, settings: { ...settings, locale: payload } };
    }
    default:
      return state;
  }
}
