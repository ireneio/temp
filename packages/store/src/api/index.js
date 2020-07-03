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
import sendResetPasswordEmail from './sendResetPasswordEmail.api';
import fbLogin from './fbLogin.api';
import updateMemberData from './updateMemberData.api';
import updateShopperLanguagePreference from './updateShopperLanguagePreference.api';
import resetPassword from './resetPassword.api';
import getTrackingCode from './getTrackingCode.api';
import changePassword from './changePassword.api';

// Server-side rendering
import serverIndexInitial from './serverIndexInitial.api';
import serverPagesInitial from './serverPagesInitial.api';
import serverProductInitial from './serverProductInitial.api';
import serverProductsInitial from './serverProductsInitial.api';
import serverOthersInitial from './serverOthersInitial.api';

import updateUser from './updateUser.api';
import createOrderApply from './createOrderApply.api';
import addOrderMessage from './addOrderMessage.api';
import updateWishList from './updateWishList.api';
import updateStockNotificationList from './updateStockNotificationList.api';
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
  sendResetPasswordEmail,
  fbLogin,
  updateMemberData,
  updateShopperLanguagePreference,
  resetPassword,
  updateUser,
  createOrderApply,
  addOrderMessage,
  updateWishList,
  updateStockNotificationList,
  getTrackingCode,
  changePassword,
  sendPaymentNotification,
  // Server-side rendering
  serverIndexInitial,
  serverPagesInitial,
  serverProductInitial,
  serverProductsInitial,
  serverOthersInitial,
};
