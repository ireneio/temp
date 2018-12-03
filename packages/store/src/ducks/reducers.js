import { combineReducers } from 'redux';
import pagesReducer from './widgets/pages';
import memberReducer from './widgets/member';
import productsReducer from './widgets/products';
import listsReducer from './widgets/lists';
import storeReducer from './widgets/store';
import loadingStatus from './widgets/loading';

const rootReducer = combineReducers({
  memberReducer,
  pagesReducer,
  productsReducer,
  listsReducer,
  storeReducer,
  loadingStatus,
});

export default rootReducer;
