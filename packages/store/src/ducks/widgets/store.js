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
  menus: [],
  color: {},
  settings: {},
  experiment: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_STORE_SUCCESS: {
      const { data } = payload;
      const menus = (data?.getMenuList?.data || []).map(menu =>
        Utils.setDefaultValueForMenuDesign(menu),
      );

      return {
        menus, // 選單
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
