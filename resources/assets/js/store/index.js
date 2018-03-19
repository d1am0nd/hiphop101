import {
  combineReducers,
  applyMiddleware,
  createStore as reduxCreateStore,
} from 'redux';
import thunk from 'redux-thunk';

import {authReducer} from '@/store/reducers/auth';
import {modalReducer} from '@/store/reducers/modal';
import {artistsReducer} from '@/store/reducers/artists';

const createStore = () => {
  return reduxCreateStore(
    combineReducers({
      auth: authReducer,
      modal: modalReducer,
      artists: artistsReducer,
    }),
    applyMiddleware(thunk)
  );
};

export {
  createStore,
};
