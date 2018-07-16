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
  const pageAdTrack = Utils.getIn(['getPageAdTrack', 'data'])(data);
  const webTrackList = Utils.getIn(['getWebTrackList', 'data'])(data);
  let facebookID = null;
  let gaID = null;
  let webMasterID = null;
  let gtmID = null;
  let conversionID = null;
  let adwordsSignup = null;
  let adwordsCheckout = null;
  let adwordsCompletedOrder = null;
  if (pageAdTrack) {
    /* eslint-disable */
    const gaMatchedVal =
      pageAdTrack.google_analytics &&
      pageAdTrack.google_analytics
        .replace(/ /gm, '')
        .match(/ga\('create','(.*?)(?=','auto'\);)/gm);
    gaID = gaMatchedVal && gaMatchedVal[0].split("'")[3];
    const fbMatchedVal =
      pageAdTrack.facebook_ads &&
      pageAdTrack.facebook_ads
        .replace(/ /gm, '')
        .match(/fbq\('init','(.*?)(?='\);fbq)/gm);
    facebookID = fbMatchedVal && fbMatchedVal[0].split("'")[3];
    /* eslint-enable */
  }
  if (webTrackList) {
    webTrackList.forEach(webTrack => {
      const { trackType } = webTrack;
      if (trackType === 'google_webmaster') {
        webMasterID = webTrack.trackId;
      } else if (trackType === 'google_tag_manager') {
        gtmID = Utils.getIn(['trackPage', 0, 'codeInfo', 'id'])(webTrack);
      } else if (trackType === 'google_adwords') {
        conversionID = Utils.getIn(['trackPage', 0, 'codeInfo', 'id'])(
          webTrack,
        );
        const strAdwordsSignup =
          webTrack.trackPage[1].trackCode &&
          webTrack.trackPage[1].trackCode
            .replace(/ /gm, '')
            .match(/google_conversion_label="(.*?)(?=";)/gm);
        adwordsSignup = strAdwordsSignup && strAdwordsSignup[0].split('"')[1];
        const strAdwordsCheckout =
          webTrack.trackPage[2].trackCode &&
          webTrack.trackPage[2].trackCode
            .replace(/ /gm, '')
            .match(/google_conversion_label="(.*?)(?=";)/gm);
        adwordsCheckout =
          strAdwordsCheckout && strAdwordsCheckout[0].split('"')[1];
        const strAdwordsCompletedOrder =
          webTrack.trackPage[3].trackCode &&
          webTrack.trackPage[3].trackCode
            .replace(/ /gm, '')
            .match(/google_conversion_label="(.*?)(?=";)/gm);
        adwordsCompletedOrder =
          strAdwordsCompletedOrder && strAdwordsCompletedOrder[0].split('"')[1];
      }
    });
  }
  return {
    facebookID,
    gaID,
    webMasterID,
    gtmID,
    conversionID,
    adwordsSignup,
    adwordsCheckout,
    adwordsCompletedOrder,
  };
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case GET_STORE_SUCCESS: {
      const { data, locale, customerCurrency } = payload;
      const activities = Utils.getIn(['getActivityList', 'data'])(data);
      const menus = Utils.setDefaultValueForMenuDesign(
        Utils.getIn(['getMenuList', 'data'])(data),
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
        locale: locale || 'zh_TW',
        localeOptions: localeOptions || ['zh_TW'], // 用於語系選單
        storeCurrency: store.currency || 'TWD', // 幣值轉換欲轉換成的幣值
        customerCurrency: customerCurrency || 'TWD', // 前台顯示的幣值
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
