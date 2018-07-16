import { takeEvery, put, call } from 'redux-saga/effects';
import * as R from 'ramda';
import * as Utils from 'utils';
import * as Api from 'api';
import * as Actions from 'ducks/actions';

/* *********************************** Get data at /index for SSR *********************************** */
const SERVER_INDEX_INITIAL = 'SERVER_INDEX_INITIAL';

export const serverIndexInitial = payload => ({
  type: SERVER_INDEX_INITIAL,
  payload,
});

function* serverIndexInitialFlow({ payload }) {
  try {
    const { XMeepshopDomain, cookie, query } = payload;

    const data = yield call(Api.serverIndexInitial, {
      XMeepshopDomain,
      cookie,
    });

    // get default locale & currency from cookies
    const locale = Utils.getCookie('locale', cookie);
    const customerCurrency = Utils.getCookie('currency', cookie);

    yield put(Actions.getStoreSuccess({ ...data, locale, customerCurrency }));
    yield put(Actions.getAuthSuccess(data));
    const homePageId = Utils.getIn([
      'data',
      'getStoreList',
      'data',
      0,
      'homePageId',
    ])(data);
    const pages = Utils.getIn(['data', 'getPageList', 'data'])(data);
    const page =
      homePageId == null ? pages[0] : R.find(R.propEq('id', homePageId))(pages);
    let modifiedPage;
    if (page) {
      modifiedPage = yield Utils.getPageWithModifyWidget(
        page,
        XMeepshopDomain,
        query,
        cookie,
      );
    } else {
      throw new Error('Index page is not found.');
    }
    yield put(Actions.getPagesSuccess(modifiedPage));
  } catch (error) {
    console.error(error);
    yield put(Actions.getStoreFailure(error.message));
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
    const { XMeepshopDomain, cookie, query } = payload;
    const { path } = query;

    const data = yield call(Api.serverPagesInitial, {
      XMeepshopDomain,
      cookie,
      path,
    });

    // get default locale & currency from cookies
    const locale = Utils.getCookie('locale', cookie);
    const customerCurrency = Utils.getCookie('currency', cookie);

    yield put(Actions.getStoreSuccess({ ...data, locale, customerCurrency }));
    yield put(Actions.getAuthSuccess(data));
    const page = Utils.getIn(['data', 'getPageList', 'data', 0])(data);
    let modifiedPage;
    if (page) {
      modifiedPage = yield Utils.getPageWithModifyWidget(
        page,
        XMeepshopDomain,
        query,
        cookie,
      );
    } else {
      throw new Error('The page is not found.');
    }
    yield put(Actions.getPagesSuccess(modifiedPage));
  } catch (error) {
    console.error(error);
    yield put(Actions.getStoreFailure(error.message));
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
    const { XMeepshopDomain, cookie, query } = payload;
    const { pId } = query;

    const data = yield call(Api.serverProductInitial, {
      XMeepshopDomain,
      cookie,
      pId,
    });

    // get default locale & currency from cookies
    const locale = Utils.getCookie('locale', cookie);
    const customerCurrency = Utils.getCookie('currency', cookie);

    yield put(Actions.getStoreSuccess({ ...data, locale, customerCurrency }));
    yield put(Actions.getAuthSuccess(data));
    const product = Utils.getIn(['data', 'computeProductList', 'data', 0])(
      data,
    );
    if (product == null) {
      throw new Error('There is no product of the id.');
    } else {
      // Get activities from computeOrderList
      // FIXME: when api join activities data in computeProductList
      const computeOrderData = yield call(Api.getActivitiesByProduct, {
        isServer: true,
        variantId: Utils.getIn(['variants', 0, 'id'])(product) || '',
        XMeepshopDomain,
        cookie,
        id: pId,
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
      yield put(Actions.getProductSuccess({ ...product, activities }));
      let pagesData;
      if (!Utils.getIn(['design'])(product)) {
        pagesData = yield call(Api.getPages, {
          pageType: 'template',
          isServer: true,
          XMeepshopDomain,
        });
      } else {
        const { templateId, pageId } = Utils.getIn(['design'])(product);
        const id = templateId || pageId;
        pagesData = yield call(Api.getPages, {
          id,
          isServer: true,
          XMeepshopDomain,
        });
      }
      const page = Utils.getIn(['data', 'getPageList', 'data', 0])(pagesData);
      let modifiedPage;
      if (page) {
        modifiedPage = yield Utils.getPageWithModifyWidget(
          page,
          XMeepshopDomain,
          query,
          cookie,
        );
      } else {
        throw new Error('Product page is not found.');
      }
      yield put(Actions.getPagesSuccess(modifiedPage));
    }
  } catch (error) {
    console.error(error);
    yield put(Actions.getStoreFailure(error.message));
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
    const { XMeepshopDomain, cookie, query } = payload;
    const data = yield call(Api.serverProductsInitial, {
      XMeepshopDomain,
      cookie,
    });

    // get default locale & currency from cookies
    const locale = Utils.getCookie('locale', cookie);
    const customerCurrency = Utils.getCookie('currency', cookie);

    yield put(Actions.getStoreSuccess({ ...data, locale, customerCurrency }));
    yield put(Actions.getAuthSuccess(data));
    const page = Utils.getIn(['data', 'getPageList', 'data', 0])(data);
    let modifiedPage;
    if (page) {
      modifiedPage = yield Utils.getPageWithModifyWidget(
        page,
        XMeepshopDomain,
        query,
        cookie,
      );
    } else {
      throw new Error('Products page is not found.');
    }
    yield put(Actions.getPagesSuccess(modifiedPage));
  } catch (error) {
    console.error(error);
    yield put(Actions.getStoreFailure(error.message));
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
    const { XMeepshopDomain, cookie } = payload;
    const data = yield call(Api.serverOthersInitial, {
      XMeepshopDomain,
      cookie,
    });

    // get default locale & currency from cookies
    const locale = Utils.getCookie('locale', cookie);
    const customerCurrency = Utils.getCookie('currency', cookie);

    yield put(Actions.getStoreSuccess({ ...data, locale, customerCurrency }));
    yield put(Actions.getAuthSuccess(data));
  } catch (error) {
    console.error(error);
    yield put(Actions.getStoreFailure(error.message));
  }
}
export function* watchServerOthersInitialFlow() {
  yield takeEvery(SERVER_OTHERS_INITIAL, serverOthersInitialFlow);
}
