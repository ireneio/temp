import { getPages, getPagesSuccess, getPagesFailure } from './widgets/pages';

import {
  getStoreSuccess,
  getStoreFailure,
  setCurrency,
  setLocale,
} from './widgets/store';

import {
  getAuth,
  getAuthSuccess,
  getAuthFailure,
  login,
  loginSuccess,
  loginFailure,
  signup,
  signupSuccess,
  signupFailure,
  signout,
  signoutSuccess,
  signoutFailure,
  forgetPassword,
  forgetPasswordSuccess,
  forgetPasswordFailure,
  addCartItems,
  addCartItemsSuccess,
  addCartItemsFailure,
  updateCartItems,
  updateCartItemsSuccess,
  updateCartItemsFailure,
  removeCartItems,
  removeCartItemsSuccess,
  removeCartItemsFailure,
  emptyCart,
  updateUser,
  updateUserSuccess,
  updateUserFailure,
  createApply,
  createApplySuccess,
  createApplyFailure,
  createOrderQA,
  createOrderQASuccess,
  createOrderQAFailure,
  updateWishList,
  updateWishListSuccess,
  updateWishListFailure,
  addToNotificationList,
  addToNotificationListSuccess,
  addToNotificationListFailure,
  getOrder,
  getOrderSuccess,
  getOrderFailure,
  resetPassword,
  resetPasswordSuccess,
  resetPasswordFailure,
  sendPaymentNotification,
  sendPaymentNotificationSuccess,
  sendPaymentNotificationFailure,
  addRecipient,
} from './widgets/member';

import { changePassword } from './widgets/others';

import {
  getProduct,
  getProductSuccess,
  getProductFailure,
} from './widgets/products';

import {
  serverIndexInitial,
  serverPagesInitial,
  serverProductInitial,
  serverProductsInitial,
  serverOthersInitial,
} from './widgets/server';

export {
  // pages
  getPages,
  getPagesSuccess,
  getPagesFailure,
  // store
  getStoreSuccess,
  getStoreFailure,
  setCurrency,
  setLocale,
  // auth
  getAuth,
  getAuthSuccess,
  getAuthFailure,
  // log in
  login,
  loginSuccess,
  loginFailure,
  // signup
  signup,
  signupSuccess,
  signupFailure,
  // signout
  signout,
  signoutSuccess,
  signoutFailure,
  // resetforgetPassword
  forgetPassword,
  forgetPasswordSuccess,
  forgetPasswordFailure,
  // resetPassword
  resetPassword,
  resetPasswordSuccess,
  resetPasswordFailure,
  // cart
  addCartItems,
  addCartItemsSuccess,
  addCartItemsFailure,
  updateCartItems,
  updateCartItemsSuccess,
  updateCartItemsFailure,
  removeCartItems,
  removeCartItemsSuccess,
  removeCartItemsFailure,
  emptyCart,
  // user
  updateUser,
  updateUserSuccess,
  updateUserFailure,
  // create apply
  createApply,
  createApplySuccess,
  createApplyFailure,
  // products
  getProduct,
  getProductSuccess,
  getProductFailure,
  // create order QA
  createOrderQA,
  createOrderQASuccess,
  createOrderQAFailure,
  // update wish list
  updateWishList,
  updateWishListSuccess,
  updateWishListFailure,
  // add to notification list
  addToNotificationList,
  addToNotificationListSuccess,
  addToNotificationListFailure,
  // get order
  getOrder,
  getOrderSuccess,
  getOrderFailure,
  // change password
  changePassword,
  // pay notify
  sendPaymentNotification,
  sendPaymentNotificationSuccess,
  sendPaymentNotificationFailure,
  // add recipient
  addRecipient,
  // Initial for server-side rendering
  serverIndexInitial,
  serverPagesInitial,
  serverProductInitial,
  serverProductsInitial,
  serverOthersInitial,
};
