import { all } from 'redux-saga/effects';

import {
  watchGetAuthFlow,
  watchGetLoginFlow,
  watchGetSignoutFlow,
  watchSignupFlow,
  watchForgetPasswordFlow,
  watchAddCartItemsFlow,
  watchUpdateCartItemsFlow,
  watchRemoveCartItemsFlow,
  watchUpdateUserFlow,
  watchUpdateWishListFlow,
  watchAddToNotificationListFlow,
  watchResetPasswordFlow,
  watchSendPaymentNotificationFlow,
} from './widgets/member';

import { watchGetProductFlow } from './widgets/products';

import { watchGetPagesFlow } from './widgets/pages';

import {
  watchServerIndexInitialFlow,
  watchServerPagesInitialFlow,
  watchServerProductInitialFlow,
  watchServerProductsInitialFlow,
  watchServerOthersInitialFlow,
} from './widgets/server';

import { watchChangePasswordFlow } from './widgets/others';

function* rootSaga() {
  yield all([
    watchAddCartItemsFlow(),
    watchUpdateCartItemsFlow(),
    watchRemoveCartItemsFlow(),
    watchGetAuthFlow(),
    watchGetLoginFlow(),
    watchGetSignoutFlow(),
    watchSignupFlow(),
    watchGetPagesFlow(),
    watchGetProductFlow(),
    watchForgetPasswordFlow(),
    watchUpdateUserFlow(),
    watchUpdateWishListFlow(),
    watchAddToNotificationListFlow(),
    watchResetPasswordFlow(),
    watchChangePasswordFlow(),
    watchSendPaymentNotificationFlow(),
    // server
    watchServerIndexInitialFlow(),
    watchServerPagesInitialFlow(),
    watchServerProductInitialFlow(),
    watchServerProductsInitialFlow(),
    watchServerOthersInitialFlow(),
  ]);
}

export default rootSaga;
