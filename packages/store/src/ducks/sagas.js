import { all } from 'redux-saga/effects';

import { watchGetAuthFlow, watchGetLoginFlow } from './widgets/member';

function* rootSaga() {
  yield all([watchGetAuthFlow(), watchGetLoginFlow()]);
}

export default rootSaga;
