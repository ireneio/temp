import { all } from 'redux-saga/effects';

import { watchGetLoginFlow } from './widgets/member';

function* rootSaga() {
  yield all([watchGetLoginFlow()]);
}

export default rootSaga;
