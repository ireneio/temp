import getPages from './getPages.api';
// Cart
import addItemsToCart from './addItemsToCart.api';
import updateItemsToCart from './updateItemsToCart.api';
import removeItemsToCart from './removeItemsToCart.api';

import getProduct from './getProduct.api';
import getProductList from './getProductList.api';
import login from './login.api';
import signout from './signout.api';
import signup from './signup.api';
import checkEmailExists from './checkEmailExists.api';
import sendMaiToForgetPassword from './sendMaiToForgetPassword.api';
import fbLogin from './fbLogin.api';
import updateMemberData from './updateMemberData.api';
import resetPassword from './resetPassword.api';
import getTrackingCode from './getTrackingCode.api';
import changePassword from './changePassword.api';
import getActivitiesByProduct from './getActivitiesByProduct.api';

// Server-side rendering
import serverIndexInitial from './serverIndexInitial.api';
import serverPagesInitial from './serverPagesInitial.api';
import serverProductInitial from './serverProductInitial.api';
import serverProductsInitial from './serverProductsInitial.api';
import serverOthersInitial from './serverOthersInitial.api';

import updateUser from './updateUser.api';
import createOrderApply from './createOrderApply.api';
import createOrderQA from './createOrderQA.api';
import updateWishList from './updateWishList.api';
import updateStockNotificationList from './updateStockNotificationList.api';
import getOrder from './getOrder.api';
import sendPaymentNotification from './sendPaymentNotification.api';

export {
  getPages,
  // 購物車
  addItemsToCart,
  updateItemsToCart,
  removeItemsToCart,
  // 商品
  getProduct,
  getProductList,
  login,
  signout,
  signup,
  checkEmailExists,
  sendMaiToForgetPassword,
  fbLogin,
  updateMemberData,
  resetPassword,
  updateUser,
  createOrderApply,
  createOrderQA,
  updateWishList,
  updateStockNotificationList,
  getOrder,
  getTrackingCode,
  changePassword,
  sendPaymentNotification,
  getActivitiesByProduct,
  // Server-side rendering
  serverIndexInitial,
  serverPagesInitial,
  serverProductInitial,
  serverProductsInitial,
  serverOthersInitial,
};
