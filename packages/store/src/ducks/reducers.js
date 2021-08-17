import { combineReducers } from 'redux';
import pagesReducer from './widgets/pages';
import memberReducer from './widgets/member';
import productsReducer from './widgets/products';
import loadingStatus from './widgets/loading';

const rootReducer = combineReducers({
  memberReducer,
  pagesReducer,
  productsReducer,
  loadingStatus,
});

export default rootReducer;
