import { getPages, getPagesSuccess, getPagesFailure } from './widgets/pages';

import { showLoadingStatus, hideLoadingStatus } from './widgets/loading';

import { getStoreSuccess, getStoreFailure, setCurrency } from './widgets/store';

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
  addRecipientAddress,
  updateRecipientAddress,
  deleteRecipientAddress,
  createApply,
  createApplySuccess,
  createApplyFailure,
  addOrderMessage,
  addOrderMessageSuccess,
  addOrderMessageFailure,
  updateWishList,
  updateWishListSuccess,
  updateWishListFailure,
  addToNotificationList,
  addToNotificationListSuccess,
  addToNotificationListFailure,
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

import { saveProductList, cleanProductList } from './widgets/lists';

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
  addRecipientAddress,
  updateRecipientAddress,
  deleteRecipientAddress,
  // create apply
  createApply,
  createApplySuccess,
  createApplyFailure,
  // products
  getProduct,
  getProductSuccess,
  getProductFailure,
  // lists
  saveProductList,
  cleanProductList,
  // add order message
  addOrderMessage,
  addOrderMessageSuccess,
  addOrderMessageFailure,
  // update wish list
  updateWishList,
  updateWishListSuccess,
  updateWishListFailure,
  // add to notification list
  addToNotificationList,
  addToNotificationListSuccess,
  addToNotificationListFailure,
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
  // loading status
  showLoadingStatus,
  hideLoadingStatus,
};
