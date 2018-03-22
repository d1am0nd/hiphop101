import axios from 'axios';

import {createStore} from '@/store';
import {isAuthenticated, getAuth} from '@/auth/store';
import {setUser, setToken, refresh} from '@/store/actions/auth';
import {getToken} from '@/auth/parsers';
import {setAuthHeader} from '@/auth/helpers';

// Set axios global defaults
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';

// Create store
const store = createStore();

// Attach user to the store,
// if already logged in
if (isAuthenticated()) {
  const {
    user: userObj,
    token: tokenObj,
  } = getAuth();

  store.dispatch(setUser(userObj));
  store.dispatch(setToken(tokenObj));
  setAuthHeader(getToken(tokenObj));

  store.dispatch(refresh());
}

export {
  store,
};
