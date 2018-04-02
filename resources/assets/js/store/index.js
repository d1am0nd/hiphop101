import {
  combineReducers,
  applyMiddleware,
  createStore as reduxCreateStore,
} from 'redux';
import thunk from 'redux-thunk';

import {miscReducer} from '@/store/reducers/misc';
import {authReducer} from '@/store/reducers/auth';
import {modalReducer} from '@/store/reducers/modal';
import {artistReducer} from '@/store/reducers/artists';

const createStore = () => {
  return reduxCreateStore(
    combineReducers({
      auth: authReducer,
      misc: miscReducer,
      modal: modalReducer,
      artist: artistReducer,
    }),
    applyMiddleware(thunk)
  );
};

export {
  createStore,
};
