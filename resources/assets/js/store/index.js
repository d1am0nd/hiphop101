import {
  combineReducers,
  applyMiddleware,
  createStore as reduxCreateStore,
} from 'redux';
import thunk from 'redux-thunk';

import {authReducer} from 'store/reducers/auth';
import {modalReducer} from 'store/reducers/modal';

const createStore = () => {
  return reduxCreateStore(
    combineReducers({
      auth: authReducer,
      modal: modalReducer,
    }),
    applyMiddleware(thunk)
  );
};

export {
  createStore,
};
