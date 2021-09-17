import { takeEvery, call, put } from 'redux-saga/effects';
import modifyWidgetDataInClient from 'utils/modifyWidgetDataInClient';
import * as Api from 'api';

/* ********************************* 取得單筆商品資料 及 該商品對應的頁面資料 ********************************* */
const GET_PRODUCT_REQUEST = 'GET_PRODUCT_REQUEST';
const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS';
const GET_PRODUCT_FAILURE = 'GET_PRODUCT_FAILURE';
const CLEAN_PRODUCT = 'CLEAN_PRODUCT';

export const getProduct = payload => ({
  type: GET_PRODUCT_REQUEST,
  payload,
});
export const getProductSuccess = payload => ({
  type: GET_PRODUCT_SUCCESS,
  payload,
});
export const getProductFailure = payload => ({
  type: GET_PRODUCT_FAILURE,
  payload,
});
export const cleanProduct = () => ({
  type: CLEAN_PRODUCT,
});

function* getProductFlow({ payload }) {
  try {
    const { query } = payload;
    const data = yield call(Api.getProduct, payload);

    if (data.apiErr) {
      yield put(getProductFailure(data.apiErr));
    } else {
      const product = data?.data?.computeProductList?.data?.[0] || null;
      if (product) {
        const { page } = product;
        const blocks = page.blocks
          .filter(
            ({ releaseDateTime }) =>
              !releaseDateTime ||
              parseInt(releaseDateTime, 10) * 1000 <= new Date().getTime(),
          )
          .map(({ width, componentWidth, widgets, ...block }) => ({
            ...block,
            width: [0, null].includes(width) ? 100 : width,
            componentWidth: componentWidth || 0,
            // 整理及過濾Client-side rendering時的module資料，未來有可能在api server就幫前端整理好
            widgets: modifyWidgetDataInClient(widgets, query, page),
          }));

        const modifiedPage = { ...page, blocks };
        yield put(
          getProductSuccess({
            ...product,
            page: modifiedPage,
          }),
        );
      } else {
        yield put(getProductFailure({ status: 'ERROR_PRODUCT_NOT_FOUND' }));
      }
    }
  } catch ({ message }) {
    yield put(getProductFailure({ status: 'SAGA_PRODUCTS', message }));
  }
}
export function* watchGetProductFlow() {
  yield takeEvery(GET_PRODUCT_REQUEST, getProductFlow);
}

/**
 * @name ProductsReducer
 * @description 商品資料，有訪問過商品頁之商品資料才會存放於此。 (包括商品頁面資料)
 * !! Note:
 * 商品列表的資料不會存放與此，原因是因為不同的商品列表會有不同的排列，不同的組成，
 * 因此直接由ProductList Component call API，並join到該module欄位。
 */

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCT_REQUEST:
      return state;
    case GET_PRODUCT_SUCCESS: {
      return [...state.filter(product => product.id !== payload.id), payload];
    }
    case GET_PRODUCT_FAILURE: {
      return { error: payload };
    }
    case CLEAN_PRODUCT:
      return initialState;
    default:
      return state;
  }
};
