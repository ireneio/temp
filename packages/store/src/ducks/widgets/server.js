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
    const data = yield call(Api.serverIndexInitial, payload);

    if (data.apiErr) {
      yield put(getStoreFailure(data.apiErr));
    } else {
      yield put(getStoreSuccess(data));
      yield put(getAuthSuccess(data));

      const page = data.data.viewer?.store?.defaultHomePage;

      if (page) {
        const modifiedPage = yield Utils.getPageWithModifyWidget(page, payload);

        yield put(getPagesSuccess(modifiedPage));
      } else {
        yield put(getStoreFailure({ status: 'ERROR_PAGE_NOT_FOUND' }));
      }
    }
  } catch ({ message }) {
    yield put(getStoreFailure({ status: 'SERVER_ERROR', message }));
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
    const data = yield call(Api.serverPagesInitial, payload);

    if (data.apiErr) {
      yield put(getStoreFailure(data.apiErr));
    } else {
      yield put(getStoreSuccess(data));
      yield put(getAuthSuccess(data));

      const page = data?.data?.viewer?.store?.customPage;

      if (page) {
        const modifiedPage = yield Utils.getPageWithModifyWidget(page, payload);

        yield put(getPagesSuccess(modifiedPage));
      } else {
        yield put(getStoreFailure({ status: 'ERROR_PAGE_NOT_FOUND' }));
      }
    }
  } catch ({ message }) {
    yield put(getStoreFailure({ status: 'SERVER_ERROR', message }));
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
    const { query } = payload;
    const { pId } = query;
    const data = yield call(Api.serverProductInitial, payload);

    if (pId === 'preview' && data?.data) {
      const { pageId } = query;
      const pageResponse = yield call(Api.getPage, { ...payload, id: pageId });
      const defaultStoreProductResponse = yield call(
        Api.getDefaultStoreProduct,
        payload,
      );
      const { defaultStoreProduct } = defaultStoreProductResponse.data;

      defaultStoreProduct.id = 'preview';
      defaultStoreProduct.page = pageResponse.data?.viewer?.store?.page || null;
      data.data.computeProductList.data = [defaultStoreProduct];
      data.data.computeProductList.total = 1;
    }

    if (data.apiErr) {
      yield put(getStoreFailure(data.apiErr));
    } else {
      yield put(getStoreSuccess(data));
      yield put(getAuthSuccess(data));

      const product = data?.data?.computeProductList?.data?.[0];

      if (product) {
        const { page } = product;
        if (page) {
          const modifiedPage = yield Utils.getPageWithModifyWidget(
            page,
            payload,
          );
          yield put(
            getProductSuccess({
              ...product,
              page: modifiedPage,
            }),
          );
        } else {
          yield put(getStoreFailure({ status: 'ERROR_PAGE_NOT_FOUND' }));
        }
      } else {
        yield put(getStoreFailure({ status: 'ERROR_PRODUCT_NOT_FOUND' }));
      }
    }
  } catch ({ message }) {
    yield put(getStoreFailure({ status: 'SERVER_ERROR', message }));
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
    const data = yield call(Api.serverProductsInitial, payload);

    if (data.apiErr) {
      yield put(getStoreFailure(data.apiErr));
    } else {
      yield put(getStoreSuccess(data));
      yield put(getAuthSuccess(data));

      const page = data.data?.viewer?.store?.defaultProductListPage;

      if (page) {
        const modifiedPage = yield Utils.getPageWithModifyWidget(page, payload);

        yield put(getPagesSuccess(modifiedPage));
      } else {
        yield put(getStoreFailure({ status: 'ERROR_PAGE_NOT_FOUND' }));
      }
    }
  } catch ({ message }) {
    yield put(getStoreFailure({ status: 'SERVER_ERROR', message }));
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
    const data = yield call(Api.serverOthersInitial, payload);

    if (data.apiErr) {
      yield put(getStoreFailure(data.apiErr));
    } else {
      yield put(getStoreSuccess(data));
      yield put(getAuthSuccess(data));
    }
  } catch ({ message }) {
    yield put(getStoreFailure({ status: 'SERVER_ERROR', message }));
  }
}
export function* watchServerOthersInitialFlow() {
  yield takeEvery(SERVER_OTHERS_INITIAL, serverOthersInitialFlow);
}
