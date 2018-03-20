import {
  combineReducers,
  applyMiddleware,
  createStore as reduxCreateStore,
} from 'redux';
import thunk from 'redux-thunk';

import {authReducer} from '@/store/reducers/auth';
import {modalReducer} from '@/store/reducers/modal';
import {sidesearchReducer} from '@/store/reducers/sidesearch';

const createStore = () => {
  return reduxCreateStore(
    combineReducers({
      auth: authReducer,
      modal: modalReducer,
      sidesearch: sidesearchReducer,
    }),
    applyMiddleware(thunk)
  );
};

export {
  createStore,
};
