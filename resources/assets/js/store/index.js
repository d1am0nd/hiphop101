import {
  combineReducers,
  applyMiddleware,
  createStore as reduxCreateStore,
} from 'redux';
import thunk from 'redux-thunk';

import {authReducer} from '@/store/reducers/auth';
import {modalReducer} from '@/store/reducers/modal';
import {artistReducer} from '@/store/reducers/artists';
import {popularReducer} from '@/store/reducers/popular';

const createStore = () => {
  return reduxCreateStore(
    combineReducers({
      auth: authReducer,
      modal: modalReducer,
      artist: artistReducer,
      popular: popularReducer,
    }),
    applyMiddleware(thunk)
  );
};

export {
  createStore,
};
