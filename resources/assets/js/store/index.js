import {
  combineReducers,
  applyMiddleware,
  createStore as reduxCreateStore,
} from 'redux';
import thunk from 'redux-thunk';

import {authReducer} from 'store/reducers/auth';

export function createStore() {
  return reduxCreateStore(
    combineReducers({
      authReducer,
    }),
    applyMiddleware(thunk)
  );
}
