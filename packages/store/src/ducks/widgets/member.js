import { takeEvery, put, call, select } from 'redux-saga/effects';
import * as Utils from 'utils';
import { notification } from 'antd';
import { gql } from 'apollo-boost';

import * as COUNTRY_LOCALE from '@meepshop/meep-ui/lib/locale/country';

import * as Api from 'api';
import { NOTLOGIN, ISUSER } from 'constants';
import client from 'apollo/initApollo';

import * as LOCALE from '../locale';
import { cleanProductList } from './lists';

const getCart = data => {
  const changeCart = data?.data?.changeCartList?.[0] || null;
  if (changeCart)
    return {
      ...changeCart,
      categories: changeCart?.categories?.[0],
    };
  return null;
};

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
  const {
    storeReducer: {
      settings: { locale },
    },
  } = yield select();
  try {
    const data = yield call(Api.updateMemberData, payload);
    if (data) yield put(getAuthSuccess(data));
  } catch (error) {
    yield put(getAuthFailure(error.message));
    notification.error({ message: LOCALE.AUTH_FAILURE[locale] });
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
  const {
    storeReducer: {
      settings: { locale },
    },
  } = yield select();

  try {
    const res = yield call(Api.login, { email, password });
    // TODO: 不需要兼容 meep-nginx 後可以移除(#553)
    if (res.isLoginSuccess || res.userId) {
      const memberData = yield call(Api.updateMemberData);
      notification.success({ message: LOCALE.LOGIN_SUCCESS[locale] });
      if (callback) callback();
      if (from === 'cart') {
        Utils.goTo({ pathname: '/checkout' });
      } else if (from === 'checkout') {
        // Use callback to go to thank-you-page, so so not go anywhere.
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
      if (numOfExpiredPoints > 0) {
        notification.info({
          message: LOCALE.EXPIRED_POINTS_MESSAGE[locale],
          description: `${LOCALE.EXPIRED_POINTS_DESCRIPTION_1[locale]} ${numOfExpiredPoints} ${LOCALE.EXPIRED_POINTS_DESCRIPTION_2[locale]}`,
        });
      }

      yield put(loginSuccess(memberData));
      yield put(cleanProductList());
    } else {
      yield put(loginFailure());
      notification.error({
        message: LOCALE.INVALID_EMAIL_OR_PASSWORD[locale],
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
  const {
    storeReducer: {
      settings: { locale },
    },
  } = yield select();
  try {
    const isSuccess = yield call(Api.signout);
    if (isSuccess) {
      const memberData = yield call(Api.updateMemberData);
      yield put(signoutSuccess(memberData.data));
      yield put(cleanProductList());
      notification.success({ message: LOCALE.SIGNOUT_SUCCESS[locale] });
    } else {
      yield put(signoutFailure());
      notification.error({ message: LOCALE.SIGNOUT_FAILURE_MESSAGE[locale] });
    }
  } catch (error) {
    yield put(signoutFailure());
    notification.error({
      message: LOCALE.SIGNOUT_FAILURE_MESSAGE[locale],
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
  const { email, password, registeredCode, callback } = payload;
  const {
    storeReducer: {
      settings: { locale },
    },
  } = yield select();

  try {
    // 檢查信箱是否已註冊
    const data = yield call(Api.checkEmailExists, { email });
    if (data) {
      if (data?.data?.checkUserInfo?.exists) {
        yield put(signupFailure());
        notification.error({ message: LOCALE.EMAIL_ALREADY_EXISTS[locale] });
      } else {
        yield call(Api.signup, {
          email,
          password,
          registeredCode,
        });

        /* Tracking code */
        const {
          storeReducer: { pageAdTrackIDs },
        } = yield select();
        Utils.execTrackingCode('CompleteRegistration', { pageAdTrackIDs });
        /* Tracking code - End */

        yield put(signupSuccess());
        notification.success({ message: LOCALE.SIGNUP_SUCCESS[locale] });
        if (callback) callback();
      }
    }
  } catch (error) {
    yield put(signupFailure());
    notification.error({
      message: LOCALE.SIGNUP_FAILURE_MESSAGE[locale],
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

function* forgetPasswordFlow({ payload: { email } }) {
  const {
    storeReducer: {
      settings: { locale },
    },
  } = yield select();
  try {
    const data = yield call(Api.sendMaiToForgetPassword, { email });

    /* Handle error */
    if (data.error) throw new Error(data.error);
    if (data.data.forgotUserPSList && data.data.forgotUserPSList.error)
      throw new Error(data.data.forgotUserPSList.error[0]);

    yield put(forgetPasswordSuccess());
    notification.success({ message: LOCALE.FORGET_PASSWORD_SUCCESS[locale] });
  } catch (error) {
    yield put(forgetPasswordFailure(error));
    notification.error({
      message: LOCALE.FORGET_PASSWORD_FAILURE_MESSAGE[locale],
      description: error.message,
    });
  }
}
export function* watchForgetPasswordFlow() {
  yield takeEvery(FORGET_PASSWORD_REQUEST, forgetPasswordFlow);
}

/* ************************************ 新增購物車商品 ************************************ */
const ADD_CART_ITEMS_REQUEST = 'ADD_CART_ITEMS_REQUEST';
const ADD_CART_ITEMS_SUCCESS = 'ADD_CART_ITEMS_SUCCESS';
const ADD_CART_ITEMS_FAILURE = 'ADD_CART_ITEMS_FAILURE';

/**
 * @name addCartItems
 * @param {Array} items = [productId, variantId, quantity ]
 */
export const addCartItems = (items, price, type) => ({
  type: ADD_CART_ITEMS_REQUEST,
  payload: { items, price, type },
});
export const addCartItemsSuccess = payload => ({
  type: ADD_CART_ITEMS_SUCCESS,
  payload,
});
export const addCartItemsFailure = () => ({
  type: ADD_CART_ITEMS_FAILURE,
});

function* AddCartItemsFlow({ payload: { type, price, ...payload } }) {
  const {
    storeReducer: {
      settings: { cname, locale },
    },
  } = yield select();
  try {
    const data = yield call(Api.addItemsToCart, payload);
    if (data) {
      const cart = getCart(data);

      /* tracking code */
      const {
        storeReducer: { pageAdTrackIDs },
      } = yield select();

      if (type === 'pop-up')
        Utils.execTrackingCode('AddToCart-EC-Popup', {
          price,
          cart,
          payload,
          pageAdTrackIDs,
          cname,
        });
      else
        Utils.execTrackingCode('AddToCart-EC', {
          price,
          cart,
          payload,
          pageAdTrackIDs,
          cname,
        });
      /* tracking code - End */

      yield put(addCartItemsSuccess(cart));
      notification.success({ message: LOCALE.ADD_CART_ITEMS_SUCCESS[locale] });
    }
  } catch (error) {
    notification.error({
      message: LOCALE.ADD_CART_ITEMS_FAILURE_MESSAGE[locale],
      description: error.message,
    });
    yield put(addCartItemsFailure());
  }
}
export function* watchAddCartItemsFlow() {
  yield takeEvery(ADD_CART_ITEMS_REQUEST, AddCartItemsFlow);
}

/* ************************************ 更改購物車商品數量 ************************************ */
const UPDATE_CART_ITEMS_REQUEST = 'UPDATE_CART_ITEMS_REQUEST';
const UPDATE_CART_ITEMS_SUCCESS = 'UPDATE_CART_ITEMS_SUCCESS';
const UPDATE_CART_ITEMS_FAILURE = 'UPDATE_CART_ITEMS_FAILURE';

export const updateCartItems = items => ({
  type: UPDATE_CART_ITEMS_REQUEST,
  payload: { items },
});
export const updateCartItemsSuccess = payload => ({
  type: UPDATE_CART_ITEMS_SUCCESS,
  payload,
});
export const updateCartItemsFailure = () => ({
  type: UPDATE_CART_ITEMS_FAILURE,
});

function* UpdateCartItemsFlow({ payload }) {
  const {
    storeReducer: {
      settings: { locale },
    },
  } = yield select();
  try {
    const data = yield call(Api.updateItemsToCart, payload);
    if (data) {
      const cart = getCart(data);
      yield put(updateCartItemsSuccess(cart));
      notification.success({
        message: LOCALE.UPDATE_CART_ITEMS_SUCCESS[locale],
      });
    }
  } catch (error) {
    yield put(updateCartItemsFailure());
    notification.error({
      message: LOCALE.UPDATE_CART_ITEMS_FAILURE_MESSAGE[locale],
      description: error.message,
    });
  }
}
export function* watchUpdateCartItemsFlow() {
  yield takeEvery(UPDATE_CART_ITEMS_REQUEST, UpdateCartItemsFlow);
}

/* ************************************ 移除購物車商品 ************************************ */
const REMOVE_CART_ITEMS_REQUEST = 'REMOVE_CART_ITEMS_REQUEST';
const REMOVE_CART_ITEMS_SUCCESS = 'REMOVE_CART_ITEMS_SUCCESS';
const REMOVE_CART_ITEMS_FAILURE = 'REMOVE_CART_ITEMS_FAILURE';

export const removeCartItems = items => ({
  type: REMOVE_CART_ITEMS_REQUEST,
  payload: { items },
});
export const removeCartItemsSuccess = payload => ({
  type: REMOVE_CART_ITEMS_SUCCESS,
  payload,
});
export const removeCartItemsFailure = () => ({
  type: REMOVE_CART_ITEMS_FAILURE,
});

function* removeCartItemsFlow({ payload }) {
  const {
    storeReducer: {
      settings: { locale },
    },
  } = yield select();
  try {
    const data = yield call(Api.removeItemsToCart, payload);
    if (data) {
      const cart = getCart(data);
      yield put(removeCartItemsSuccess(cart));
      notification.success({
        message: LOCALE.REMOVE_CART_ITEMS_SUCCESS[locale],
      });
    }
  } catch (error) {
    yield put(removeCartItemsFailure());
    notification.error({
      message: LOCALE.REMOVE_CART_ITEMS_FAILURE_MESSAGE[locale],
      description: error.message,
    });
  }
}
export function* watchRemoveCartItemsFlow() {
  yield takeEvery(REMOVE_CART_ITEMS_REQUEST, removeCartItemsFlow);
}

/* ************************************ 更新會員資料 ************************************ */
const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const updateUser = ({ user }) => ({
  type: UPDATE_USER_REQUEST,
  payload: user,
});
export const updateUserSuccess = payload => ({
  type: UPDATE_USER_SUCCESS,
  payload,
});
export const updateUserFailure = () => ({
  type: UPDATE_USER_FAILURE,
});

function* updateUserFlow({ payload }) {
  const {
    storeReducer: {
      settings: { locale },
    },
  } = yield select();
  try {
    const data = yield call(Api.updateUser, payload);
    if (data) {
      yield put(updateUserSuccess(data));
      notification.success({ message: LOCALE.UPDATE_USER_SUCCESS[locale] });
    }
  } catch (error) {
    yield put(updateUserFailure());
    notification.error({
      message: LOCALE.UPDATE_USER_FAILURE_MESSAGE[locale],
      description: error.message,
    });
  }
}
export function* watchUpdateUserFlow() {
  yield takeEvery(UPDATE_USER_REQUEST, updateUserFlow);
}

/* ******************************** 新增收件人範本 ********************************* */
const ADD_RECIPIENT_ADDRESS_REQUEST = 'ADD_RECIPIENT_ADDRESS_REQUEST';

export const addRecipientAddress = payload => ({
  type: ADD_RECIPIENT_ADDRESS_REQUEST,
  payload,
});

function* addRecipientAddressFlow({ payload }) {
  const {
    storeReducer: {
      settings: { locale },
    },
    memberReducer: { user },
  } = yield select();

  try {
    const {
      data: {
        addRecipientAddress: { status, recipientAddressId },
      },
    } = yield call(Api.addRecipientAddress, payload);

    if (status === 'OK') {
      const {
        input: { name, mobile, countryId, cityId, areaId, zipCode, street },
      } = payload;
      const countryData = client().readFragment({
        id: countryId,
        fragment: gql`
          fragment getCountryFragment on Country {
            id
            name {
              zh_TW
              en_US
              ja_JP
              vi_VN
            }
          }
        `,
      });
      const cityData = client().readFragment({
        id: cityId,
        fragment: gql`
          fragment cityFragment on City {
            id
            name {
              zh_TW
              en_US
              ja_JP
              vi_VN
            }
          }
        `,
      });
      const areaData = client().readFragment({
        id: areaId,
        fragment: gql`
          fragment areaFragment on Area {
            id
            name {
              zh_TW
              en_US
              ja_JP
              vi_VN
            }
          }
        `,
      });

      const country = !countryData.id ? null : countryData.name.en_US;
      const city = !cityData.id ? null : cityData.name[locale];
      const county = !areaData.id ? null : areaData.name[locale];

      yield put(
        updateUserSuccess({
          data: {
            updateUserList: [
              {
                ...user,
                recipientData: [
                  ...user.recipientData,
                  {
                    id: recipientAddressId,
                    name,
                    mobile,
                    address: {
                      postalCode: zipCode,
                      yahooCode: {
                        country,
                        city,
                        county,
                        street,
                      },
                    },
                  },
                ],
              },
            ],
          },
        }),
      );
    }
  } catch (error) {
    yield put(updateUserFailure());

    notification.error({
      message: LOCALE.UPDATE_USER_FAILURE_MESSAGE[locale],
      description: error.message,
    });
  }
}

export function* watchAddRecipientAddressFlow() {
  yield takeEvery(ADD_RECIPIENT_ADDRESS_REQUEST, addRecipientAddressFlow);
}

/* ******************************** 修改收件人範本 ********************************* */
const UPDATE_RECIPIENT_ADDRESS_REQUEST = 'UPDATE_RECIPIENT_ADDRESS_REQUEST';

export const updateRecipientAddress = payload => ({
  type: UPDATE_RECIPIENT_ADDRESS_REQUEST,
  payload,
});

function* updateRecipientAddressFlow({
  payload: { recipientIndexForRedux, ...payload },
}) {
  const {
    storeReducer: {
      settings: { locale },
    },
    memberReducer: { user },
  } = yield select();

  try {
    const {
      data: {
        updateRecipientAddress: { status },
      },
    } = yield call(Api.updateRecipientAddress, payload);

    if (status === 'OK') {
      const {
        input: { name, mobile, countryId, cityId, areaId, zipCode, street },
      } = payload;
      const countryData = client().readFragment({
        id: countryId,
        fragment: gql`
          fragment getCountryFragment on Country {
            id
            name {
              zh_TW
              en_US
              ja_JP
              vi_VN
            }
          }
        `,
      });
      const cityData = client().readFragment({
        id: cityId,
        fragment: gql`
          fragment cityFragment on City {
            id
            name {
              zh_TW
              en_US
              ja_JP
              vi_VN
            }
          }
        `,
      });
      const areaData = client().readFragment({
        id: areaId,
        fragment: gql`
          fragment areaFragment on Area {
            id
            name {
              zh_TW
              en_US
              ja_JP
              vi_VN
            }
          }
        `,
      });

      const country = !countryData.id ? null : countryData.name.en_US;
      const city = !cityData.id ? null : cityData.name[locale];
      const county = !areaData.id ? null : areaData.name[locale];
      const recipientData = [...user.recipientData];

      recipientData[recipientIndexForRedux] = {
        ...recipientData[recipientIndexForRedux],
        name,
        mobile,
        address: {
          postalCode: zipCode,
          yahooCode: {
            country,
            city,
            county,
            street,
          },
        },
      };

      yield put(
        updateUserSuccess({
          data: {
            updateUserList: [
              {
                ...user,
                recipientData,
              },
            ],
          },
        }),
      );
    }
  } catch (error) {
    yield put(updateUserFailure());

    notification.error({
      message: LOCALE.UPDATE_USER_FAILURE_MESSAGE[locale],
      description: error.message,
    });
  }
}

export function* watchUpdateRecipientAddressFlow() {
  yield takeEvery(UPDATE_RECIPIENT_ADDRESS_REQUEST, updateRecipientAddressFlow);
}

/* ******************************** 刪除收件人範本 ********************************* */
const DELETE_RECIPIENT_ADDRESS_REQUEST = 'DELETE_RECIPIENT_ADDRESS_REQUEST';

export const deleteRecipientAddress = payload => ({
  type: DELETE_RECIPIENT_ADDRESS_REQUEST,
  payload,
});

function* deleteRecipientAddressFlow({
  payload: { recipientIndexForRedux, ...payload },
}) {
  const {
    storeReducer: {
      settings: { locale },
    },
    memberReducer: { user },
  } = yield select();

  try {
    const {
      data: {
        deleteRecipientAddress: { status },
      },
    } = yield call(Api.deleteRecipientAddress, payload);

    if (status === 'OK')
      yield put(
        updateUserSuccess({
          data: {
            updateUserList: [
              {
                ...user,
                recipientData: user.recipientData.filter(
                  (_, index) => recipientIndexForRedux !== index,
                ),
              },
            ],
          },
        }),
      );
  } catch (error) {
    yield put(updateUserFailure());

    notification.error({
      message: LOCALE.UPDATE_USER_FAILURE_MESSAGE[locale],
      description: error.message,
    });
  }
}

export function* watchDeleteRecipientAddressFlow() {
  yield takeEvery(DELETE_RECIPIENT_ADDRESS_REQUEST, deleteRecipientAddressFlow);
}

/* ************************************ 退貨申請 ************************************ */
const CREATE_APPLY_REQUEST = 'CREATE_APPLY_REQUEST';
const CREATE_APPLY_SUCCESS = 'CREATE_APPLY_SUCCESS';
const CREATE_APPLY_FAILURE = 'CREATE_APPLY_FAILURE';

export const createApply = payload => ({
  type: CREATE_APPLY_REQUEST,
  payload,
});
export const createApplySuccess = payload => ({
  type: CREATE_APPLY_SUCCESS,
  payload,
});
export const createApplyFailure = () => ({
  type: CREATE_APPLY_FAILURE,
});

function* createApplyFlow({ payload }) {
  const {
    storeReducer: {
      settings: { locale },
    },
  } = yield select();
  try {
    const data = yield call(Api.createOrderApply, payload);
    if (data) {
      yield put(createApplySuccess(data));
      notification.success({ message: LOCALE.CREATE_APPLY_SUCCESS[locale] });
      Utils.goTo({ pathname: '/orders' });
    }
  } catch (error) {
    yield put(createApplyFailure());
    notification.error({
      message: LOCALE.CREATE_APPLY_FAILURE_MESSAGE[locale],
      description: error.message,
    });
  }
}
export function* watchCreateApplyFlow() {
  yield takeEvery(CREATE_APPLY_REQUEST, createApplyFlow);
}

/* ************************************ 發送訂單問答 ************************************ */
const ADD_ORDER_MESSAGE_REQUEST = 'ADD_ORDER_MESSAGE_REQUEST';
const ADD_ORDER_MESSAGE_SUCCESS = 'ADD_ORDER_MESSAGE_SUCCESS';
const ADD_ORDER_MESSAGE_FAILURE = 'ADD_ORDER_MESSAGE_FAILURE';

export const addOrderMessage = payload => ({
  type: ADD_ORDER_MESSAGE_REQUEST,
  payload,
});
export const addOrderMessageSuccess = payload => ({
  type: ADD_ORDER_MESSAGE_SUCCESS,
  payload,
});
export const addOrderMessageFailure = () => ({
  type: ADD_ORDER_MESSAGE_FAILURE,
});

function* addOrderMessageFlow({ payload }) {
  const {
    storeReducer: {
      settings: { locale },
    },
  } = yield select();
  try {
    const data = yield call(Api.addOrderMessage, payload);

    if (data.apiErr) {
      yield put(addOrderMessageFailure());
      notification.error({
        message: LOCALE.ADD_ORDER_MESSAGE_FAILURE_MESSAGE[locale],
        description: data.apiErr.message,
      });
    } else {
      yield put(addOrderMessageSuccess(data));
      notification.success({
        message: LOCALE.ADD_ORDER_MESSAGE_SUCCESS[locale],
      });
    }
  } catch (error) {
    yield put(addOrderMessageFailure());
    notification.error({
      message: LOCALE.ADD_ORDER_MESSAGE_FAILURE_MESSAGE[locale],
      description: error.message,
    });
  }
}
export function* watchAddOrderMessageFlow() {
  yield takeEvery(ADD_ORDER_MESSAGE_REQUEST, addOrderMessageFlow);
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

function* updateWishListFlow({ payload }) {
  const {
    storeReducer: {
      settings: { locale },
    },
  } = yield select();
  try {
    const data = yield call(Api.updateWishList, payload);
    if (data) {
      /* Tracking code */
      const {
        storeReducer: { pageAdTrackIDs },
      } = yield select();
      Utils.execTrackingCode('AddToWishlist', { pageAdTrackIDs });
      /* Tracking code - End */

      yield put(updateWishListSuccess(data));
      notification.success({ message: LOCALE.UPDATE_WISHLIST_SUCCESS[locale] });
    }
  } catch (error) {
    yield put(updateWishListFailure());
    notification.error({
      message: LOCALE.UPDATE_WISHLIST_FAILURE_MESSAGE[locale],
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
  const {
    storeReducer: {
      settings: { locale },
    },
  } = yield select();
  try {
    const data = yield call(Api.updateStockNotificationList, payload);
    if (data) {
      yield put(addToNotificationListSuccess(data));
      notification.success({
        message: LOCALE.ADD_STOCK_NOTIFICATION_LIST_SUCCESS[locale],
      });
    }
  } catch (error) {
    yield put(addToNotificationListFailure());
    notification.error({
      message: LOCALE.ADD_STOCK_NOTIFICATION_LIST_FAILURE_MESSAGE[locale],
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

/* ************************************ 取得訂單 ************************************ */
const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
const GET_ORDER_FAILURE = 'GET_ORDER_FAILURE';

export const getOrder = payload => ({
  type: GET_ORDER_REQUEST,
  payload,
});
export const getOrderSuccess = payload => ({
  type: GET_ORDER_SUCCESS,
  payload,
});
export const getOrderFailure = () => ({
  type: GET_ORDER_FAILURE,
});

function* getOrderFlow({ payload }) {
  const {
    storeReducer: {
      settings: { locale },
    },
  } = yield select();
  try {
    const {
      memberReducer: { orders },
    } = yield select();
    if (!orders.find(order => order.id === payload.orderId)) {
      const data = yield call(Api.getOrder, payload);
      if (data) {
        yield put(getOrderSuccess(data));
      }
    }
  } catch (error) {
    yield put(getOrderFailure());
    notification.error({
      message: LOCALE.GET_ORDER_FAILURE_MESSAGE[locale],
      description: error.message,
    });
  }
}
export function* watchGetOrderFlow() {
  yield takeEvery(GET_ORDER_REQUEST, getOrderFlow);
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
  const {
    storeReducer: {
      settings: { locale },
    },
  } = yield select();
  try {
    const data = yield call(Api.resetPassword, payload);
    if (data) {
      /* Handle error */
      if (data.error) throw new Error(data.error);
      const { error } = Utils.getIn(['data', 'updateUserPSList'])(data);
      if (error) throw new Error(error);

      yield put(resetPasswordSuccess());
      notification.success({ message: LOCALE.RESET_PASSWORD_SUCCESS[locale] });
      Utils.goTo({ pathname: '/login' });
    }
  } catch (error) {
    yield put(resetPasswordFailure());
    notification.error({
      message: LOCALE.RESET_PASSWORD_FAILURE_MESSAGE[locale],
      description: error.message,
    });
  }
}
export function* watchResetPasswordFlow() {
  yield takeEvery(RESET_PASSWORD_REQUEST, resetPasswordFlow);
}

/* ************************************ 成立訂單，清空購物車 ************************************ */
const EMPTY_CART = 'EMPTY_CART';

export const emptyCart = usePoints => ({
  type: EMPTY_CART,
  payload: { usePoints },
});

/* ************************************ 送出匯款通知 ************************************ */
const SEND_PAYMENT_NOTIFICATION_REQUEST = 'SEND_PAYMENT_NOTIFICATION_REQUEST';
const SEND_PAYMENT_NOTIFICATION_SUCCESS = 'SEND_PAYMENT_NOTIFICATION_SUCCESS';
const SEND_PAYMENT_NOTIFICATION_FAILURE = 'SEND_PAYMENT_NOTIFICATION_FAILURE';

export const sendPaymentNotification = payload => ({
  type: SEND_PAYMENT_NOTIFICATION_REQUEST,
  payload,
});

export const sendPaymentNotificationSuccess = payload => ({
  type: SEND_PAYMENT_NOTIFICATION_SUCCESS,
  payload,
});

export const sendPaymentNotificationFailure = () => ({
  type: SEND_PAYMENT_NOTIFICATION_FAILURE,
});

function* sendPaymentNotificationFlow({ payload }) {
  const {
    storeReducer: {
      settings: { locale },
    },
  } = yield select();
  try {
    const data = yield call(Api.sendPaymentNotification, payload);
    if (data) {
      const updateOrder = data?.data?.updateOrderList?.[0];

      yield put(sendPaymentNotificationSuccess(updateOrder));
      notification.success({
        message: LOCALE.SEND_PAYMENT_NOTIFICATION_SUCCESS[locale],
      });
    }
  } catch (error) {
    yield put(sendPaymentNotificationFailure());
    notification.error({
      message: LOCALE.SEND_PAYMENT_NOTIFICATION_FAILURE_MESSAGE[locale],
      description: error.message,
    });
  }
}

export function* watchSendPaymentNotificationFlow() {
  yield takeEvery(
    SEND_PAYMENT_NOTIFICATION_REQUEST,
    sendPaymentNotificationFlow,
  );
}

/* ************************************ 送出匯款通知 ************************************ */
const ADD_RECIPIENT = 'ADD_RECIPIENT';

export const addRecipient = payload => ({
  type: ADD_RECIPIENT,
  payload,
});

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
  const country = _user?.additionalInfo?.address?.yahooCode?.country || null;
  const city = _user?.additionalInfo?.address?.yahooCode?.city || null;
  const county = _user?.additionalInfo?.address?.yahooCode?.county || null;
  const street = _user?.additionalInfo?.address?.yahooCode?.street || null;
  const year = _user?.birthday?.year || null;
  const month = _user?.birthday?.month || null;
  const day = _user?.birthday?.day || null;
  const recipientData = _user?.recipientData || [];
  const recipientAddressBook = _user?.recipientAddressBook || [];
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
      address: {
        yahooCode: {
          country,
          city,
          county,
          street,
        },
      },
    },
    birthday: {
      year,
      month,
      day,
    },
    recipientData: (_user?.recipientData
      ? recipientData
      : recipientAddressBook.map(
          ({
            postalCode,
            yahooCodeCountry,
            yahooCodeCity,
            yahooCodeCounty,
            street: recipientStreet,
            ...recipient
          }) => ({
            ...recipient,
            address: {
              postalCode,
              yahooCode: {
                country: yahooCodeCountry,
                city: yahooCodeCity,
                county: yahooCodeCounty,
                street: recipientStreet,
              },
            },
          }),
        )
    ).filter(recipient =>
      Object.values(COUNTRY_LOCALE).some(locale =>
        Object.values(locale).includes(recipient?.address?.yahooCode?.country),
      ),
    ),
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
  const currentBalance = viewer?.rewardPoint.currentBalance || 0;

  // TODO: 未改為Viewer
  const cartData = data?.getCartList?.data?.[0] || null;
  const cart = cartData
    ? { ...cartData, categories: cartData?.categories?.[0] }
    : null;

  const stockNotificationList = data?.getStockNotificationList?.data || [];
  const orderApply = data?.getOrderApplyList?.data || [];
  const orders = data?.getOrderList?.data || [];
  const userPoints = data?.getValidUserPointList?.data || [];

  return {
    isLogin,
    user,
    cart,
    wishList,
    currentBalance,
    stockNotificationList,
    orders,
    orderApply,
    userPoints,
    loading: false,
    loadingTip: '',
  };
};

const initialState = {
  isLogin: NOTLOGIN,
  user: null,
  cart: null,
  wishList: [],
  stockNotificationList: [],
  orders: [],
  orderApply: [],
  loading: false,
  loadingTip: '',
};

export default function(state = initialState, { type, payload }) {
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
    /* 新增購物車商品 */
    case ADD_CART_ITEMS_REQUEST: {
      return {
        ...state,
        loading: true,
        loadingTip: ADD_CART_ITEMS_REQUEST,
      };
    }
    case ADD_CART_ITEMS_SUCCESS: {
      return {
        ...state,
        cart: payload,
        loading: false,
        loadingTip: '',
      };
    }
    case ADD_CART_ITEMS_FAILURE: {
      return {
        ...state,
        loading: false,
        loadingTip: '',
      };
    }
    /* 更改購物車商品數量 */
    case UPDATE_CART_ITEMS_REQUEST: {
      return {
        ...state,
        loading: true,
        loadingTip: UPDATE_CART_ITEMS_REQUEST,
      };
    }
    case UPDATE_CART_ITEMS_SUCCESS: {
      return {
        ...state,
        cart: payload,
        loading: false,
        loadingTip: '',
      };
    }
    case UPDATE_CART_ITEMS_FAILURE: {
      return {
        ...state,
        loading: false,
        loadingTip: '',
      };
    }
    /* 移除購物車商品 */
    case REMOVE_CART_ITEMS_REQUEST: {
      return {
        ...state,
        loading: true,
        loadingTip: REMOVE_CART_ITEMS_REQUEST,
      };
    }
    case REMOVE_CART_ITEMS_SUCCESS: {
      return {
        ...state,
        cart: payload,
        loading: false,
        loadingTip: '',
      };
    }
    case REMOVE_CART_ITEMS_FAILURE: {
      return {
        ...state,
        loading: false,
        loadingTip: '',
      };
    }
    /* 更新會員資料 */
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        loading: true,
        loadingTip: UPDATE_USER_REQUEST,
      };
    }
    case UPDATE_USER_SUCCESS: {
      const user = payload?.data?.updateUserList?.[0];
      return {
        ...state,
        user: getUser(user),
        loading: false,
        loadingTip: '',
      };
    }
    case UPDATE_USER_FAILURE: {
      return {
        ...state,
        loading: false,
        loadingTip: '',
      };
    }
    case CREATE_APPLY_REQUEST: {
      return {
        ...state,
        loading: true,
        loadingTip: CREATE_APPLY_REQUEST,
      };
    }
    case CREATE_APPLY_SUCCESS: {
      const orderApplyItem = payload?.data?.createOrderApplyList?.[0];
      return {
        ...state,
        orderApply: state.orderApply.concat(orderApplyItem),
        loading: false,
        loadingTip: '',
      };
    }
    case CREATE_APPLY_FAILURE: {
      return {
        ...state,
        loading: false,
        loadingTip: '',
      };
    }
    case ADD_ORDER_MESSAGE_REQUEST: {
      return {
        ...state,
        loading: true,
        loadingTip: ADD_ORDER_MESSAGE_REQUEST,
      };
    }
    case ADD_ORDER_MESSAGE_SUCCESS: {
      return {
        ...state,
        loading: false,
        loadingTip: '',
      };
    }
    case ADD_ORDER_MESSAGE_FAILURE: {
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
    case GET_ORDER_REQUEST: {
      return state;
    }
    case GET_ORDER_SUCCESS: {
      const order = payload?.data?.getOrderList?.data;
      if (!order) throw new Error('no order data');
      return {
        ...state,
        orders: order.concat(state.orders),
      };
    }
    case GET_ORDER_FAILURE: {
      return state;
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
    case EMPTY_CART: {
      const { usePoints } = payload;

      return {
        ...state,
        currentBalance: state.currentBalance - (usePoints || 0),
        cart: null,
      };
    }
    case SEND_PAYMENT_NOTIFICATION_REQUEST: {
      return {
        ...state,
        loading: true,
        loadingTip: SEND_PAYMENT_NOTIFICATION_REQUEST,
      };
    }
    case SEND_PAYMENT_NOTIFICATION_SUCCESS: {
      const { id: orderId, paidMessage } = payload;
      const newOrders = state.orders.map(order => {
        if (order.id === orderId) {
          return {
            ...order,
            paidMessage,
          };
        }
        return order;
      });
      return {
        ...state,
        orders: newOrders,
        loading: false,
        loadingTip: '',
      };
    }
    case SEND_PAYMENT_NOTIFICATION_FAILURE: {
      return {
        ...state,
        loading: false,
        loadingTip: '',
      };
    }

    case ADD_RECIPIENT: {
      const { recipient } = payload;
      const user = state?.user;
      const recipientData = user?.recipientData;

      return {
        ...state,
        user: {
          ...user,
          recipientData: [...recipientData, recipient],
        },
      };
    }

    default:
      return state;
  }
}
