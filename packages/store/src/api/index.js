import getPages from './getPages.api';
import getPage from './getPage.api';

import getProduct from './getProduct.api';
import getProductList from './getProductList.api';
import getDefaultStoreProduct from './getDefaultStoreProduct.api';
import signup from './signup.api';
import checkEmailExists from './checkEmailExists.api';
import sendResetPasswordEmail from './sendResetPasswordEmail.api';
import updateMemberData from './updateMemberData.api';
import updateShopperLanguagePreference from './updateShopperLanguagePreference.api';
import changePassword from './changePassword.api';

// Server-side rendering
import serverIndexInitial from './serverIndexInitial.api';
import serverPagesInitial from './serverPagesInitial.api';
import serverProductInitial from './serverProductInitial.api';
import serverProductsInitial from './serverProductsInitial.api';
import serverOthersInitial from './serverOthersInitial.api';

import updateWishList from './updateWishList.api';
import updateStockNotificationList from './updateStockNotificationList.api';

export {
  getPages,
  getPage,
  // 商品
  getProduct,
  getProductList,
  getDefaultStoreProduct,
  signup,
  checkEmailExists,
  sendResetPasswordEmail,
  updateMemberData,
  updateShopperLanguagePreference,
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
