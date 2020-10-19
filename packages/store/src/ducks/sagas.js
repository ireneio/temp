import { all } from 'redux-saga/effects';

import {
  watchGetAuthFlow,
  watchGetLoginFlow,
  watchGetSignoutFlow,
  watchSignupFlow,
  watchForgetPasswordFlow,
  watchUpdateWishListFlow,
  watchAddToNotificationListFlow,
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

function* rootSaga() {
  yield all([
    watchGetAuthFlow(),
    watchGetLoginFlow(),
    watchGetSignoutFlow(),
    watchSignupFlow(),
    watchGetPagesFlow(),
    watchGetProductFlow(),
    watchForgetPasswordFlow(),
    watchUpdateWishListFlow(),
    watchAddToNotificationListFlow(),
    // server
    watchServerIndexInitialFlow(),
    watchServerPagesInitialFlow(),
    watchServerProductInitialFlow(),
    watchServerProductsInitialFlow(),
    watchServerOthersInitialFlow(),
  ]);
}

export default rootSaga;
