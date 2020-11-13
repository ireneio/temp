import getPages from './getPages.api';
import getPage from './getPage.api';

import getProduct from './getProduct.api';
import getDefaultStoreProduct from './getDefaultStoreProduct.api';
import signup from './signup.api';
import checkEmailExists from './checkEmailExists.api';
import updateMemberData from './updateMemberData.api';

// Server-side rendering
import serverIndexInitial from './serverIndexInitial.api';
import serverPagesInitial from './serverPagesInitial.api';
import serverProductInitial from './serverProductInitial.api';
import serverProductsInitial from './serverProductsInitial.api';
import serverOthersInitial from './serverOthersInitial.api';

import updateWishList from './updateWishList.api';

export {
  getPages,
  getPage,
  // 商品
  getProduct,
  getDefaultStoreProduct,
  signup,
  checkEmailExists,
  updateMemberData,
  updateWishList,
  // Server-side rendering
  serverIndexInitial,
  serverPagesInitial,
  serverProductInitial,
  serverProductsInitial,
  serverOthersInitial,
};
