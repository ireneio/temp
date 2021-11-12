import { combineReducers } from 'redux';

import memberReducer from './widgets/member';
import loadingStatus from './widgets/loading';

const rootReducer = combineReducers({
  memberReducer,
  loadingStatus,
});

export default rootReducer;
