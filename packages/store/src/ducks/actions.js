import { getPages, getPagesSuccess, getPagesFailure } from './widgets/pages';

import { showLoadingStatus, hideLoadingStatus } from './widgets/loading';

import { getStoreSuccess, getStoreFailure } from './widgets/store';

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
  updateWishList,
  updateWishListSuccess,
  updateWishListFailure,
} from './widgets/member';

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
  // products
  getProduct,
  getProductSuccess,
  getProductFailure,
  // lists
  saveProductList,
  cleanProductList,
  // update wish list
  updateWishList,
  updateWishListSuccess,
  updateWishListFailure,
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
