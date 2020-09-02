import getPages from './getPages.api';
import getPage from './getPage.api';

import getProduct from './getProduct.api';
import getProductList from './getProductList.api';
import getDefaultStoreProducts from './getDefaultStoreProducts.api';
import login from './login.api';
import signout from './signout.api';
import signup from './signup.api';
import checkEmailExists from './checkEmailExists.api';
import sendResetPasswordEmail from './sendResetPasswordEmail.api';
import fbLogin from './fbLogin.api';
import updateMemberData from './updateMemberData.api';
import updateShopperLanguagePreference from './updateShopperLanguagePreference.api';
import resetPassword from './resetPassword.api';
import changePassword from './changePassword.api';

// Server-side rendering
import serverIndexInitial from './serverIndexInitial.api';
import serverPagesInitial from './serverPagesInitial.api';
import serverProductInitial from './serverProductInitial.api';
import serverProductsInitial from './serverProductsInitial.api';
import serverOthersInitial from './serverOthersInitial.api';

import updateUser from './updateUser.api';
import updateWishList from './updateWishList.api';
import updateStockNotificationList from './updateStockNotificationList.api';

export {
  getPages,
  getPage,
  // 商品
  getProduct,
  getProductList,
  getDefaultStoreProducts,
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
  updateWishList,
  updateStockNotificationList,
  changePassword,
  // Server-side rendering
  serverIndexInitial,
  serverPagesInitial,
  serverProductInitial,
  serverProductsInitial,
  serverOthersInitial,
};
