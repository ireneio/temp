import { all } from 'redux-saga/effects';

import {
  watchGetAuthFlow,
  watchGetLoginFlow,
  watchSignupFlow,
} from './widgets/member';

function* rootSaga() {
  yield all([watchGetAuthFlow(), watchGetLoginFlow(), watchSignupFlow()]);
}

export default rootSaga;
