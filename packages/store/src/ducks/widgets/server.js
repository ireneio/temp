import { takeEvery, put, call } from 'redux-saga/effects';
import * as Utils from 'utils';
import * as Api from 'api';

import { getStoreSuccess, getStoreFailure } from './store';
import { getPagesSuccess } from './pages';
import { getAuthSuccess } from './member';
import { getProductSuccess } from './products';

/* *********************************** Get data at /index for SSR *********************************** */
const SERVER_INDEX_INITIAL = 'SERVER_INDEX_INITIAL';

export const serverIndexInitial = payload => ({
  type: SERVER_INDEX_INITIAL,
  payload,
});

function* serverIndexInitialFlow({ payload }) {
  try {
    const { cookie } = payload;
    const data = yield call(Api.serverIndexInitial, payload);

    if (data.apiErr) {
      yield put(getStoreFailure(data.apiErr));
    } else {
      /* Get default locale & currency from cookies */
      const locale = Utils.getCookie('locale', cookie);
      const customerCurrency = Utils.getCookie('currency', cookie);

      yield put(getStoreSuccess({ ...data, locale, customerCurrency }));
      yield put(getAuthSuccess(data));

      const homePageId = data?.data?.getStoreList?.data?.[0]?.homePageId;
      const pages = data?.data?.getPageList?.data;

      const page = !homePageId
        ? pages[0]
        : pages.find(_page => _page.id === homePageId);

      const modifiedPage = yield Utils.getPageWithModifyWidget(page, payload);
      yield put(getPagesSuccess(modifiedPage));
    }
  } catch ({ message }) {
    const status = 'SERVER_ERROR';
    console.log(`${status}: ${message}`);
    yield put(getStoreFailure({ status, message }));
  }
}
export function* watchServerIndexInitialFlow() {
  yield takeEvery(SERVER_INDEX_INITIAL, serverIndexInitialFlow);
}

/* *********************************** Get data at /pages for SSR *********************************** */
const SERVER_PAGES_INITIAL = 'SERVER_PAGES_INITIAL';

export const serverPagesInitial = payload => ({
  type: SERVER_PAGES_INITIAL,
  payload,
});

function* serverPagesInitialFlow({ payload }) {
  try {
    const { cookie } = payload;
    const data = yield call(Api.serverPagesInitial, payload);

    if (data.apiErr) {
      yield put(getStoreFailure(data.apiErr));
    } else {
      /* Get default locale & currency from cookies */
      const locale = Utils.getCookie('locale', cookie);
      const customerCurrency = Utils.getCookie('currency', cookie);

      yield put(getStoreSuccess({ ...data, locale, customerCurrency }));
      yield put(getAuthSuccess(data));

      const page = data?.data?.getPageList?.data?.[0];
      if (page) {
        const modifiedPage = yield Utils.getPageWithModifyWidget(page, payload);
        yield put(getPagesSuccess(modifiedPage));
      } else {
        yield put(getStoreFailure({ status: 'ERROR_PAGE_NOT_FOUND' }));
      }
    }
  } catch ({ message }) {
    const status = 'SERVER_ERROR';
    console.log(`${status}: ${message}`);
    yield put(getStoreFailure({ status, message }));
  }
}
export function* watchServerPagesInitialFlow() {
  yield takeEvery(SERVER_PAGES_INITIAL, serverPagesInitialFlow);
}

/* *********************************** Get data at /product for SSR *********************************** */
const SERVER_PRODUCT_INITIAL = 'SERVER_PRODUCT_INITIAL';

export const serverProductInitial = payload => ({
  type: SERVER_PRODUCT_INITIAL,
  payload,
});

function* serverProductInitialFlow({ payload }) {
  try {
    const { cookie, query } = payload;
    const { pId } = query;

    const data = yield call(Api.serverProductInitial, payload);

    if (data.apiErr) {
      yield put(getStoreFailure(data.apiErr));
    } else {
      /* get default locale & currency from cookies */
      const locale = Utils.getCookie('locale', cookie);
      const customerCurrency = Utils.getCookie('currency', cookie);

      yield put(getStoreSuccess({ ...data, locale, customerCurrency }));
      yield put(getAuthSuccess(data));
      const product = data?.data?.computeProductList?.data?.[0];
      if (product) {
        /* Get activities from computeOrderList */
        const computeOrderData = yield call(Api.getActivitiesByProduct, {
          ...payload,
          variantId: product?.variants?.[0]?.id || '',
          id: pId,
        });
        if (computeOrderData.apiErr) {
          yield put(getStoreFailure(computeOrderData.apiErr));
        } else {
          const activities =
            computeOrderData?.data?.computeOrderList?.[0]?.categories?.[0]
              ?.products?.[0]?.activityInfo || [];

          /* Join activities in corresponding product */
          yield put(getProductSuccess({ ...product, activities }));
          let pagesData;
          const { templateId, pageId } = product?.design || {};
          if (!pageId && !templateId) {
            pagesData = yield call(Api.getPages, {
              ...payload,
              pageType: 'template',
            });
          } else {
            pagesData = yield call(Api.getPages, {
              ...payload,
              id: templateId || pageId,
            });
          }
          if (pagesData.apiErr) {
            yield put(getStoreFailure(pagesData.apiErr));
          } else {
            const page = pagesData?.data?.getPageList?.data?.[0];
            if (page) {
              const modifiedPage = yield Utils.getPageWithModifyWidget(
                page,
                payload,
              );
              yield put(getPagesSuccess(modifiedPage));
            } else {
              throw new Error('Product page is not found.');
            }
          }
        }
      } else {
        yield put(getStoreFailure('ERROR_PRODUCT_NOT_FOUND'));
      }
    }
  } catch ({ message }) {
    const status = 'SERVER_ERROR';
    console.log(`${status}: ${message}`);
    yield put(getStoreFailure({ status, message }));
  }
}
export function* watchServerProductInitialFlow() {
  yield takeEvery(SERVER_PRODUCT_INITIAL, serverProductInitialFlow);
}

/* *********************************** Get data at /products for SSR *********************************** */
const SERVER_PRODUCTS_INITIAL = 'SERVER_PRODUCTS_INITIAL';

export const serverProductsInitial = payload => ({
  type: SERVER_PRODUCTS_INITIAL,
  payload,
});

function* serverProductsInitialFlow({ payload }) {
  try {
    const { cookie } = payload;
    const data = yield call(Api.serverProductsInitial, payload);

    if (data.apiErr) {
      yield put(getStoreFailure(data.apiErr));
    } else {
      /* get default locale & currency from cookies */
      const locale = Utils.getCookie('locale', cookie);
      const customerCurrency = Utils.getCookie('currency', cookie);

      yield put(getStoreSuccess({ ...data, locale, customerCurrency }));
      yield put(getAuthSuccess(data));
      const page = data?.data?.getPageList?.data?.[0];
      if (page) {
        const modifiedPage = yield Utils.getPageWithModifyWidget(page, payload);
        yield put(getPagesSuccess(modifiedPage));
      } else {
        throw new Error('Products page is not found.');
      }
    }
  } catch ({ message }) {
    const status = 'SERVER_ERROR';
    console.log(`${status}: ${message}`);
    yield put(getStoreFailure({ status, message }));
  }
}
export function* watchServerProductsInitialFlow() {
  yield takeEvery(SERVER_PRODUCTS_INITIAL, serverProductsInitialFlow);
}

/* *********************************** Get data at other routes for SSR *********************************** */
const SERVER_OTHERS_INITIAL = 'SERVER_OTHERS_INITIAL';

export const serverOthersInitial = payload => ({
  type: SERVER_OTHERS_INITIAL,
  payload,
});

function* serverOthersInitialFlow({ payload }) {
  try {
    const { cookie } = payload;
    const data = yield call(Api.serverOthersInitial, payload);

    if (data.apiErr) {
      yield put(getStoreFailure(data.apiErr));
    } else {
      // get default locale & currency from cookies
      const locale = Utils.getCookie('locale', cookie);
      const customerCurrency = Utils.getCookie('currency', cookie);

      yield put(getStoreSuccess({ ...data, locale, customerCurrency }));
      yield put(getAuthSuccess(data));
    }
  } catch ({ message }) {
    const status = 'SERVER_ERROR';
    console.log(`${status}: ${message}`);
    yield put(getStoreFailure({ status, message }));
  }
}
export function* watchServerOthersInitialFlow() {
  yield takeEvery(SERVER_OTHERS_INITIAL, serverOthersInitialFlow);
}
