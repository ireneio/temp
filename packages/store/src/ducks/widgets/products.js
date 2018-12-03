import { takeEvery, call, put } from 'redux-saga/effects';
import * as Utils from 'utils';
import modifyWidgetDataInClient from 'utils/modifyWidgetDataInClient';
import * as Api from 'api';
import { getPagesSuccess } from './pages';

/* ********************************* 取得單筆商品資料 及 該商品對應的頁面資料 ********************************* */
const GET_PRODUCT_REQUEST = 'GET_PRODUCT_REQUEST';
const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS';
const GET_PRODUCT_FAILURE = 'GET_PRODUCT_FAILURE';

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

function* getProductFlow({ payload }) {
  try {
    const { query } = payload;
    const data = yield call(Api.getProduct, payload);

    if (data.apiErr) {
      yield put(getProductFailure(data.apiErr));
    } else {
      const product = data?.data?.computeProductList?.data?.[0] || null;
      if (product) {
        // Get activities from computeOrderList
        // FIXME: when api join activities data in computeProductList
        const computeOrderData = yield call(Api.getActivitiesByProduct, {
          ...payload,
          variantId: product?.variants?.[0]?.id || '',
        });
        if (computeOrderData.apiErr) {
          yield put(getProductFailure(computeOrderData.apiErr));
        } else {
          const activities =
            computeOrderData?.data?.computeOrderList?.[0]?.categories?.[0]
              ?.products?.[0]?.activityInfo || [];

          // FIXME: Join activities in corresponding product
          yield put(getProductSuccess({ ...product, activities }));

          const { templateId, pageId } = product?.design || {};
          const pagesData =
            !pageId && !templateId
              ? yield call(Api.getPages, { pageType: 'template' })
              : yield call(Api.getPages, { id: templateId || pageId });

          if (pagesData.apiErr) {
            yield put(getProductFailure(pagesData.apiErr));
          } else {
            // 整理data為了符合Layout Component結構，未來有可能在api server就幫前端整理好
            const page = pagesData.data.getPageList.data[0];
            const blocks = page.blocks
              .filter(
                ({ releaseDateTime }) =>
                  !releaseDateTime ||
                  parseInt(releaseDateTime, 10) * 1000 <= new Date().getTime(),
              )
              .map(({ width, componentWidth, widgets, ...block }) => ({
                ...block,
                width: [0, null].includes(width) ? 100 : width,
                componentWidth: componentWidth === null ? 0 : componentWidth,
                // 整理及過濾Client-side rendering時的module資料，未來有可能在api server就幫前端整理好
                widgets: modifyWidgetDataInClient(widgets, query),
              }));

            const modifiedPage = { ...page, blocks };
            yield put(getPagesSuccess(modifiedPage));
          }
        }
      } else {
        yield put(getProductFailure({ status: 'ERROR_PRODUCT_NOT_FOUND' }));
      }
    }
  } catch ({ message }) {
    const status = 'SAGA_PRODUCTS';
    Utils.logToServer({ type: status, message });
    console.log(`${status}: ${message}`);
    yield put(getProductFailure({ status, message }));
  }
}
export function* watchGetProductFlow() {
  yield takeEvery(GET_PRODUCT_REQUEST, getProductFlow);
}

/**
 * @name ProductsReducer
 * @description 商品資料，有訪問過商品頁之商品資料才會存放於此。
 * !! Note:
 * 商品列表的資料不會存放與此，原因是因為不同的商品列表會有不同的排列，不同的組成，
 * 因此直接由ProductList Component call API，並join到該module欄位。
 */

const initialState = [];

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case GET_PRODUCT_REQUEST:
      return state;
    case GET_PRODUCT_SUCCESS: {
      return state.concat([payload]);
    }
    case GET_PRODUCT_FAILURE: {
      return { error: payload };
    }
    default:
      return state;
  }
}
