import getPage from './getPage.api';

import getProduct from './getProduct.api';
import getDefaultStoreProduct from './getDefaultStoreProduct.api';
import signup from './signup.api';
import updateMemberData from './updateMemberData.api';

// Server-side rendering
import serverIndexInitial from './serverIndexInitial.api';
import serverPagesInitial from './serverPagesInitial.api';
import serverProductInitial from './serverProductInitial.api';
import serverProductsInitial from './serverProductsInitial.api';
import serverOthersInitial from './serverOthersInitial.api';

export {
  getPage,
  // 商品
  getProduct,
  getDefaultStoreProduct,
  signup,
  updateMemberData,
  // Server-side rendering
  serverIndexInitial,
  serverPagesInitial,
  serverProductInitial,
  serverProductsInitial,
  serverOthersInitial,
};
