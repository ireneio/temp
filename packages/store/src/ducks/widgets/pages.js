import { takeEvery, call, put } from 'redux-saga/effects';
import modifyWidgetDataInClient from 'utils/modifyWidgetDataInClient';
import * as Api from 'api';

/* ********************************** 取得頁面資料 ********************************** */
const FETCH_PAGES_REQUEST = 'FETCH_PAGES_REQUEST';
const FETCH_PAGES_SUCCESS = 'FETCH_PAGES_SUCCESS';
const FETCH_PAGES_FAILURE = 'FETCH_PAGES_FAILURE';

/**
 * @description 透過 path/id/pageType 取得頁面資料
 * @param {String} path page path
 * @param {String} id page id
 * @param {String} pageType page type (ex. 'home', 'products', 'custom', 'product')
 */
export const getPages = payload => ({
  type: FETCH_PAGES_REQUEST,
  payload,
});
export const getPagesSuccess = payload => ({
  type: FETCH_PAGES_SUCCESS,
  payload,
});
export const getPagesFailure = payload => ({
  type: FETCH_PAGES_FAILURE,
  payload,
});

function* getPagesFlow({ payload }) {
  const { query } = payload;
  try {
    const data = yield call(Api.getPages, payload);

    let newPages = data?.data?.getPageList?.data || [];
    if (newPages.length > 0) {
      newPages = newPages.map(page => {
        const blocks = page.blocks
          .filter(
            ({ releaseDateTime }) =>
              !releaseDateTime ||
              parseInt(releaseDateTime, 10) * 1000 <= new Date().getTime(),
          )
          .map(({ width, componentWidth, widgets, ...block }) => ({
            ...block,
            width: width || 100,
            componentWidth: componentWidth || 0,
            widgets: modifyWidgetDataInClient(widgets, query),
          }));
        return { ...page, blocks };
      });
      yield put(getPagesSuccess(newPages));
    } else {
      yield put(getPagesFailure('ERROR_PAGE_NOT_FOUND'));
    }
  } catch (error) {
    yield put(getPagesFailure(error.message));
  }
}
export function* watchGetPagesFlow() {
  yield takeEvery(FETCH_PAGES_REQUEST, getPagesFlow);
}

const initialState = [];

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_PAGES_REQUEST:
      return state;
    case FETCH_PAGES_SUCCESS: {
      return payload ? state.concat(payload) : state;
    }
    case FETCH_PAGES_FAILURE: {
      return { error: payload };
    }
    default:
      return state;
  }
}
