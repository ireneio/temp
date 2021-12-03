import { gql } from '@apollo/client';
import { takeEvery, put, call } from 'redux-saga/effects';
import * as Utils from 'utils';
import { notification } from 'antd';

import { i18n } from '@meepshop/locales';

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

      yield put(loginSuccess());
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

const initialState = {
  loading: false,
  loadingTip: '',
};

export default (state = initialState, { type }) => {
  switch (type) {
    /* 登入 */
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        loadingTip: LOGIN_REQUEST,
      };
    case LOGIN_SUCCESS: {
      return state;
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
