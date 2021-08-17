import { getPages, getPagesSuccess, getPagesFailure } from './widgets/pages';

import { showLoadingStatus, hideLoadingStatus } from './widgets/loading';

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
} from './widgets/member';

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
