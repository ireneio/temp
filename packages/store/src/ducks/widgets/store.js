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

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_STORE_SUCCESS: {
      const { data } = payload;
      const activities = data?.getActivityList?.data || [];
      const menus = (data?.getMenuList?.data || []).map(menu =>
        Utils.setDefaultValueForMenuDesign(menu),
      );
      const memberGroups = data?.viewer?.store?.memberGroups || [];
      const store = data?.viewer?.store;
      const storeSettings = data?.viewer?.store?.setting;
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
        currencyOptions: currencyOptions || ['TWD'], // 用於幣值選單
      };

      return {
        shippableCountries: store?.shippableCountries || [],
        activities, // 折扣活動
        menus, // 選單
        memberGroups,
        settings,
        experiment: store?.experiment || {},
      };
    }
    case GET_STORE_FAILURE: {
      const error = payload;
      return { error };
    }
    default:
      return state;
  }
};
