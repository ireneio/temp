import gql from 'graphql-tag';
import { takeEvery, put, call } from 'redux-saga/effects';
import * as Utils from 'utils';
import { notification } from 'antd';

import { i18n } from '@meepshop/locales';

import * as Api from 'api';
import { NOTLOGIN, ISUSER } from 'constants';

/* ********************************* 檢查登入狀態 ********************************* */
const AUTH_REQUEST = 'AUTH_REQUEST';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const AUTH_FAILURE = 'AUTH_FAILURE';

/**
 * @name getAuth
 * @description Client-side getAuth() & Server-side getAuth({ XMeepshopDomain, cookie })
 * @param {Object} payload = { XMeepshopDomain, cookie }
 */
export const getAuth = payload => ({
  type: AUTH_REQUEST,
  payload,
});
export const getAuthSuccess = payload => ({
  type: AUTH_SUCCESS,
  payload,
});
export const getAuthFailure = payload => ({
  tyoe: AUTH_FAILURE,
  payload,
});

function* getAuthFlow({ payload }) {
  try {
    const data = yield call(Api.updateMemberData, payload);

    if (data) yield put(getAuthSuccess(data));
  } catch (error) {
    yield put(getAuthFailure(error.message));
    notification.error({ message: i18n.t('ducks:auth-failure') });
  }
}
export function* watchGetAuthFlow() {
  yield takeEvery(AUTH_REQUEST, getAuthFlow);
}

/* ********************************* 登入 ********************************* */
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

/**
 * @param {Object} payload = { email, password }
 */
export const login = payload => ({
  type: LOGIN_REQUEST,
  payload,
});
export const loginSuccess = payload => ({
  type: LOGIN_SUCCESS,
  payload,
});
export const loginFailure = payload => ({
  type: LOGIN_FAILURE,
  payload,
});

export function* loginFlow({ payload }) {
  const { email, password, callback, from, client } = payload;

  try {
    const { data } = yield call(() =>
      client.mutate({
        mutation: gql`
          mutation login($input: LoginInput!) {
            login(input: $input) @client {
              status
            }
          }
        `,
        variables: {
          input: { email, password },
        },
      }),
    );

    if (data.login.status === 'OK') {
      const memberData = yield call(Api.updateMemberData);

      notification.success({ message: i18n.t('ducks:login-success') });

      if (callback) callback();
      if (from === 'cart') {
        Utils.goTo({ pathname: '/checkout' });
      } else if (from === 'checkout') {
        // Use callback to go to thank-you-page, so do not go anywhere.
      } else if (from === 'landingPage') {
        // Stay in the landing page, so do not go anywhere.
      } else if (window.storePreviousPageUrl) {
        Utils.goTo({ pathname: window.storePreviousPageUrl });
      } else {
        Utils.goTo({ pathname: '/' });
      }

      /* notify nearly expire user points */
      const numOfExpiredPoints =
        memberData?.data?.viewer?.rewardPoint.expiringPoints.total;

      if (numOfExpiredPoints > 0)
        notification.info({
          message: i18n.t('ducks:expired-points-message'),
          description: i18n.t('ducks:expired-points-description', {
            point: numOfExpiredPoints,
          }),
        });

      yield put(loginSuccess(memberData));
    } else {
      yield put(loginFailure());
      notification.error({
        message: i18n.t('ducks:invalid-email-or-password'),
      });
    }
  } catch (error) {
    yield put(loginFailure());
    notification.error({ message: error.message });
  }
}
export function* watchGetLoginFlow() {
  yield takeEvery(LOGIN_REQUEST, loginFlow);
}

const getMemberData = payload => {
  const { data } = payload;

  // 已改用新API: Viewer
  const viewer = data?.viewer;
  const isLogin = viewer?.role === 'SHOPPER' ? ISUSER : NOTLOGIN;

  return {
    isLogin,
    loading: false,
    loadingTip: '',
  };
};

const initialState = {
  isLogin: NOTLOGIN,
  orders: [],
  loading: false,
  loadingTip: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    /* 檢查登入狀態 */
    case AUTH_REQUEST:
      return {
        ...state,
        loading: true,
        loadingTip: AUTH_REQUEST,
      };
    case AUTH_SUCCESS: {
      return getMemberData(payload);
    }
    case AUTH_FAILURE: {
      return {
        ...state,
        error: payload,
        loading: false,
        loadingTip: '',
      };
    }
    /* 登入 */
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        loadingTip: LOGIN_REQUEST,
      };
    case LOGIN_SUCCESS: {
      return getMemberData(payload);
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        loading: false,
        loadingTip: '',
      };
    }
    default:
      return state;
  }
};
