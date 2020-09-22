import gql from 'graphql-tag';
import { takeEvery, put, call } from 'redux-saga/effects';
import * as Utils from 'utils';
import { notification } from 'antd';

import { i18n } from '@meepshop/utils/lib/i18n';
import initApollo from '@meepshop/apollo/lib/initApollo';

import * as Api from 'api';
import { NOTLOGIN, ISUSER } from 'constants';

import { cleanProductList } from './lists';
import { cleanProduct } from './products';

/* ********************************* 檢查登入狀態 ********************************* */
const AUTH_REQUEST = 'AUTH_REQUEST';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const AUTH_FAILURE = 'AUTH_FAILURE';

/**
 * @name getAuth
 * @description Client-side getAuth() & Server-side getAuth({ isServer, XMeepshopDomain, cookie })
 * @param {Object} payload = { isServer, XMeepshopDomain, cookie }
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
  const { email, password, callback, from } = payload;

  try {
    const { data } = yield call(() =>
      initApollo({ name: 'store' }).mutate({
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
      const locales = memberData?.data?.viewer?.store.setting.locale || [
        'zh_TW',
      ];
      const locale = memberData?.data?.viewer?.locale;

      const language = (() => {
        if (locales.includes(locale)) return locale;

        if (locales.includes(i18n.language)) return i18n.language;

        return locales[0];
      })();

      if (language !== i18n.language) yield call(i18n.changeLanguage, language);

      if (language !== locale) {
        yield call(Api.updateShopperLanguagePreference, i18n.language);
        initApollo({ name: 'store' }).writeFragment({
          id: memberData?.data?.viewer?.id,
          fragment: gql`
            fragment updateLocaleCache on User {
              id
              locale
            }
          `,
          data: {
            __typename: 'User',
            id: memberData?.data?.viewer?.id,
            locale: language,
          },
        });
      }

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

      yield put(cleanProduct());
      yield put(loginSuccess(memberData));
      yield put(cleanProductList());
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

/* ********************************* 登出 ********************************* */
const SIGNOUT_REQUEST = 'SIGNOUT_REQUEST';
const SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS';
const SIGNOUT_FAILURE = 'SIGNOUT_FAILURE';

export const signout = () => ({
  type: SIGNOUT_REQUEST,
});
export const signoutSuccess = payload => ({
  type: SIGNOUT_SUCCESS,
  payload,
});
export const signoutFailure = () => ({
  type: SIGNOUT_FAILURE,
});

function* signoutFlow() {
  try {
    const { data } = yield call(() =>
      initApollo({ name: 'store' }).mutate({
        mutation: gql`
          mutation logout {
            logout @client {
              status
            }
          }
        `,
      }),
    );

    if (data.logout.status === 'OK') {
      const memberData = yield call(Api.updateMemberData);

      yield put(signoutSuccess(memberData.data));
      yield put(cleanProductList());
      notification.success({ message: i18n.t('ducks:signout-success') });
    } else {
      yield put(signoutFailure());
      notification.error({ message: i18n.t('ducks:signout-failure-message') });
    }
  } catch (error) {
    yield put(signoutFailure());
    notification.error({
      message: i18n.t('ducks:signout-failure-message'),
      description: error.message,
    });
  }
}
export function* watchGetSignoutFlow() {
  yield takeEvery(SIGNOUT_REQUEST, signoutFlow);
}

/* ********************************* 註冊 ********************************* */
const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const signup = payload => ({
  type: SIGNUP_REQUEST,
  payload,
});
export const signupSuccess = () => ({
  type: SIGNUP_SUCCESS,
});
export const signupFailure = () => ({
  type: SIGNUP_FAILURE,
});

function* signupFlow({ payload }) {
  const { values, callback } = payload;

  try {
    // 檢查信箱是否已註冊
    const data = yield call(Api.checkEmailExists, { email: values.email });

    if (data) {
      if (data?.data?.checkUserInfo?.exists) {
        yield put(signupFailure());
        notification.error({ message: i18n.t('ducks:email-already-exists') });
      } else {
        yield call(Api.signup, values);
        yield put(signupSuccess());
        notification.success({ message: i18n.t('ducks:signup-success') });

        if (callback) callback();
      }
    }
  } catch (error) {
    yield put(signupFailure());
    notification.error({
      message: i18n.t('ducks:signup-failure-message'),
      description: error.message,
    });
  }
}
export function* watchSignupFlow() {
  yield takeEvery(SIGNUP_REQUEST, signupFlow);
}

/* ********************************* 忘記密碼 ********************************* */
const FORGET_PASSWORD_REQUEST = 'FORGET_PASSWORD_REQUEST';
const FORGET_PASSWORD_SUCCESS = 'FORGET_PASSWORD_SUCCESS';
const FORGET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

/**
 * @name forgetPassword
 * @param {Object} payload = { email, callback }
 */
export const forgetPassword = payload => ({
  type: FORGET_PASSWORD_REQUEST,
  payload,
});
export const forgetPasswordSuccess = () => ({
  type: FORGET_PASSWORD_SUCCESS,
});
export const forgetPasswordFailure = () => ({
  type: FORGET_PASSWORD_FAILURE,
});

function* forgetPasswordFlow({ payload: { email, cname } }) {
  try {
    const data = yield call(Api.sendResetPasswordEmail, { email, cname });

    /* Handle error */
    if (data.error) throw new Error(data.error);

    switch (data.data.sendResetPasswordEmail.status) {
      case 'OK':
        yield put(forgetPasswordSuccess());
        notification.success({
          message: i18n.t('ducks:forget-password-success'),
        });
        break;

      case 'FAIL_CANNOT_FIND_USER':
        throw new Error(i18n.t('ducks:cannot-find-user'));

      default:
        throw new Error(data.data.sendResetPasswordEmail.status);
    }
  } catch (error) {
    yield put(forgetPasswordFailure());
    notification.error({
      message: i18n.t('ducks:forget-password-failure-message'),
      description: error.message,
    });
  }
}
export function* watchForgetPasswordFlow() {
  yield takeEvery(FORGET_PASSWORD_REQUEST, forgetPasswordFlow);
}

/* ************************************ 加入/移除願望清單 ************************************ */
const UPDATE_WISHLIST_REQUEST = 'UPDATE_WISHLIST_REQUEST';
const UPDATE_WISHLIST_SUCCESS = 'UPDATE_WISHLIST_SUCCESS';
const UPDATE_WISHLIST_FAILURE = 'UPDATE_WISHLIST_FAILURE';

export const updateWishList = payload => ({
  type: UPDATE_WISHLIST_REQUEST,
  payload,
});
export const updateWishListSuccess = payload => ({
  type: UPDATE_WISHLIST_SUCCESS,
  payload,
});
export const updateWishListFailure = () => ({
  type: UPDATE_WISHLIST_FAILURE,
});

function* updateWishListFlow({ payload: { callback, ...payload } }) {
  try {
    const data = yield call(Api.updateWishList, payload);

    if (data) {
      if (callback) callback();

      yield put(updateWishListSuccess(data));
      notification.success({
        message: i18n.t('ducks:update-wishlist-success'),
      });
    }
  } catch (error) {
    yield put(updateWishListFailure());
    notification.error({
      message: i18n.t('ducks:update-wishlist-failure-message'),
      description: error.message,
    });
  }
}
export function* watchUpdateWishListFlow() {
  yield takeEvery(UPDATE_WISHLIST_REQUEST, updateWishListFlow);
}

/* ************************************ 加入可訂購通知 ************************************ */
const ADD_STOCK_NOTIFICATION_LIST_REQUEST =
  'ADD_STOCK_NOTIFICATION_LIST_REQUEST';
const ADD_STOCK_NOTIFICATION_LIST_SUCCESS =
  'ADD_STOCK_NOTIFICATION_LIST_SUCCESS';
const ADD_STOCK_NOTIFICATION_LIST_FAILURE =
  'ADD_STOCK_NOTIFICATION_LIST_FAILURE';

export const addToNotificationList = payload => ({
  type: ADD_STOCK_NOTIFICATION_LIST_REQUEST,
  payload,
});
export const addToNotificationListSuccess = payload => ({
  type: ADD_STOCK_NOTIFICATION_LIST_SUCCESS,
  payload,
});
export const addToNotificationListFailure = () => ({
  type: ADD_STOCK_NOTIFICATION_LIST_FAILURE,
});

function* addToNotificationListFlow({ payload }) {
  try {
    const data = yield call(Api.updateStockNotificationList, payload);

    if (data) {
      yield put(addToNotificationListSuccess(data));
      notification.success({
        message: i18n.t('ducks:add-stock-notification-list-success'),
      });
    }
  } catch (error) {
    yield put(addToNotificationListFailure());
    notification.error({
      message: i18n.t('ducks:add-stock-notification-list-failure-message'),
      description: error.message,
    });
  }
}
export function* watchAddToNotificationListFlow() {
  yield takeEvery(
    ADD_STOCK_NOTIFICATION_LIST_REQUEST,
    addToNotificationListFlow,
  );
}

/* ************************************ 重置密碼 ************************************ */
const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

export const resetPassword = payload => ({
  type: RESET_PASSWORD_REQUEST,
  payload,
});
export const resetPasswordSuccess = () => ({
  type: RESET_PASSWORD_SUCCESS,
});
export const resetPasswordFailure = () => ({
  type: RESET_PASSWORD_FAILURE,
});

function* resetPasswordFlow({ payload }) {
  try {
    const response = yield call(Api.resetPassword, payload);

    if (response) {
      const { data, error } = response;

      if (error) throw new Error(error);

      switch (data.setUserPasswordByToken.status) {
        case 'SUCCESS':
          yield put(resetPasswordSuccess());
          notification.success({
            message: i18n.t('ducks:reset-password-success'),
          });
          Utils.goTo({ pathname: '/login' });
          break;
        case 'FAIL_TOKEN_TIMEOUT':
        case 'FAIL_TOKEN_NOT_FOUND':
          yield put(resetPasswordFailure());
          notification.error({
            message: i18n.t('ducks:reset-password-token-error'),
          });
          break;
        default:
          throw new Error(data.setUserPasswordByToken.status);
      }
    }
  } catch (error) {
    yield put(resetPasswordFailure());
    notification.error({
      message: i18n.t('ducks:reset-password-failure-message'),
      description: error.message,
    });
  }
}
export function* watchResetPasswordFlow() {
  yield takeEvery(RESET_PASSWORD_REQUEST, resetPasswordFlow);
}

/**
 * @name AuthReducer
 * @description data related member
 */

const getUser = _user => {
  const id = _user?.id || '';
  const name = _user?.name || '';
  const gender = _user?.gender || null;
  const email = _user?.email || '';
  const groupId = _user?.groupId || null;
  const startDate = _user?.group?.[_user.group.length - 1]?.startDate || null;
  const expireDate = _user?.group?.[_user.group.length - 1]?.expireDate || null;
  const unlimitedDate =
    _user?.group?.[_user.group.length - 1]?.unlimitedDate || null;
  const mobile = _user?.additionalInfo?.mobile || '';
  const tel = _user?.additionalInfo?.tel || '';
  const year = _user?.birthday?.year || null;
  const month = _user?.birthday?.month || null;
  const day = _user?.birthday?.day || null;
  const userNotification = _user.notification || null;

  return {
    id,
    name,
    email,
    gender,
    groupId,
    group: {
      startDate,
      expireDate,
      unlimitedDate,
    },
    additionalInfo: {
      mobile,
      tel,
    },
    address: _user?.address,
    birthday: {
      year,
      month,
      day,
    },
    notification: userNotification,
  };
};

const getMemberData = payload => {
  const { data } = payload;

  // 已改用新API: Viewer
  const viewer = data?.viewer;
  const user = viewer ? getUser(viewer) : null;
  const isLogin = viewer?.role === 'SHOPPER' ? ISUSER : NOTLOGIN;
  const wishList = viewer?.wishlist || [];

  // TODO: 未改為Viewer
  const stockNotificationList = data?.getStockNotificationList?.data || [];

  return {
    isLogin,
    user,
    wishList,
    stockNotificationList,
    loading: false,
    loadingTip: '',
  };
};

const initialState = {
  isLogin: NOTLOGIN,
  user: null,
  wishList: [],
  stockNotificationList: [],
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
    /* 登出 */
    case SIGNOUT_REQUEST:
      return {
        ...state,
        loading: true,
        loadingTip: SIGNOUT_REQUEST,
      };
    case SIGNOUT_SUCCESS: {
      return getMemberData(payload);
    }
    case SIGNOUT_FAILURE: {
      return {
        ...state,
        loading: false,
        loadingTip: '',
      };
    }
    /* 註冊 */
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        loadingTip: SIGNUP_REQUEST,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingTip: '',
      };
    case SIGNUP_FAILURE: {
      return {
        ...state,
        loading: false,
        loadingTip: '',
      };
    }
    /* 重設密碼（忘記密碼） */
    case FORGET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: false,
        loadingTip: FORGET_PASSWORD_REQUEST,
      };
    case FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingTip: '',
      };
    case FORGET_PASSWORD_FAILURE: {
      return {
        ...state,
        loading: false,
        loadingTip: '',
      };
    }
    case UPDATE_WISHLIST_REQUEST: {
      return {
        ...state,
        loading: true,
        loadingTip: UPDATE_WISHLIST_REQUEST,
      };
    }
    case UPDATE_WISHLIST_SUCCESS: {
      const { wishList } = state;
      const newState = {
        ...state,
        loading: false,
        loadingTip: '',
      };

      if (payload?.data?.removeWishlistProduct) {
        const { productId } = payload.data.removeWishlistProduct;

        return {
          ...newState,
          wishList: wishList.filter(({ productId: id }) => id !== productId),
        };
      }

      if (payload?.data?.addWishlistProduct) {
        const { wishlistProduct } = payload.data.addWishlistProduct;

        return {
          ...newState,
          wishList: [wishlistProduct, ...wishList],
        };
      }

      return newState;
    }

    case UPDATE_WISHLIST_FAILURE: {
      return {
        ...state,
        loading: false,
        loadingTip: '',
      };
    }
    case ADD_STOCK_NOTIFICATION_LIST_REQUEST: {
      return {
        ...state,
        loading: true,
        loadingTip: ADD_STOCK_NOTIFICATION_LIST_REQUEST,
      };
    }
    case ADD_STOCK_NOTIFICATION_LIST_SUCCESS: {
      const stockNotification = payload?.data?.updateStockNotificationList?.[0];
      return {
        ...state,
        stockNotificationList: state.stockNotificationList.concat([
          stockNotification,
        ]),
        loading: false,
        loadingTip: '',
      };
    }
    case ADD_STOCK_NOTIFICATION_LIST_FAILURE: {
      return {
        ...state,
        loading: false,
        loadingTip: '',
      };
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        loading: true,
        loadingTip: RESET_PASSWORD_REQUEST,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        loading: false,
        loadingTip: '',
      };
    }
    case RESET_PASSWORD_FAILURE: {
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
