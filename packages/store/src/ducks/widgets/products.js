import { takeEvery, call, put } from 'redux-saga/effects';
import * as R from 'ramda';
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
    const productData = yield call(Api.getProduct, payload);

    const product = Utils.getIn(['data', 'computeProductList', 'data', 0])(
      productData,
    );
    if (product == null) {
      throw new Error('There is no product of the id.');
    } else {
      // Get activities from computeOrderList
      // FIXME: when api join activities data in computeProductList
      const computeOrderData = yield call(Api.getActivitiesByProduct, {
        ...payload,
        variantId: Utils.getIn(['variants', 0, 'id'])(product) || '',
      });
      const activities =
        Utils.getIn([
          'data',
          'computeOrderList',
          0,
          'categories',
          0,
          'products',
          0,
          'activityInfo',
        ])(computeOrderData) || [];

      // FIXME: Join activities in corresponding product
      yield put(getProductSuccess({ ...product, activities }));
      let pagesData;
      if (!Utils.getIn(['design'])(product)) {
        const { isServer, XMeepshopDomain } = payload;
        pagesData = yield call(Api.getPages, {
          pageType: 'template',
          isServer,
          XMeepshopDomain,
        });
      } else {
        const { templateId, pageId } = Utils.getIn(['design'])(product);
        const id = templateId || pageId;
        const { isServer, XMeepshopDomain } = payload;
        pagesData = yield call(Api.getPages, { id, isServer, XMeepshopDomain });
      }

      // 整理data為了符合Layout Component結構，未來有可能在api server就幫前端整理好
      let newPages = Utils.getIn(['data', 'getPageList', 'data'])(pagesData);
      newPages = newPages.map(page => {
        const blocks = Utils.getIn(['blocks'])(page)
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
        return R.assocPath(['blocks'], blocks, page);
      });

      yield put(getPagesSuccess(newPages));
    }
  } catch (error) {
    console.error(error);
    yield put(getProductFailure(error.message));
  }
}
export function* watchGetProductFlow() {
  yield takeEvery(GET_PRODUCT_REQUEST, getProductFlow);
}

/**
 * @name ProductsReducer
 * @description 商品資料，有訪問過商品頁之商品資料才會存放與此。
 * !! Note:
 * 商品列表的資料不會存放與此，原因是因為不同的商品列表會有不同的排列，不同的組成，
 * 因此直接由ProductList Compoenent call API，並join到該module欄位。
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
