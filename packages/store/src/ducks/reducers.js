import { combineReducers } from 'redux';
import pagesReducer from './widgets/pages';
import memberReducer from './widgets/member';
import productsReducer from './widgets/products';
import storeReducer from './widgets/store';

const rootReducer = combineReducers({
  memberReducer,
  pagesReducer,
  productsReducer,
  storeReducer,
});

export default rootReducer;
