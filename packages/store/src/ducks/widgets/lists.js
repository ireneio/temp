const SAVE_PRODUCT_LIST = 'SAVE_PRODUCT_LIST';
const CLEAN_PRODUCT_LIST = 'CLEAN_PRODUCT_LIST';

export const saveProductList = payload => ({
  type: SAVE_PRODUCT_LIST,
  payload,
});

export const cleanProductList = () => ({
  type: CLEAN_PRODUCT_LIST,
});

/**
 * @name ListsReducer
 * @description 商品列表資料，有訪問過商品列表才會存放於此。
 */

const initialState = {};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case SAVE_PRODUCT_LIST:
      return {
        ...state,
        ...payload,
      };
    case CLEAN_PRODUCT_LIST:
      return {};
    default:
      return state;
  }
}
