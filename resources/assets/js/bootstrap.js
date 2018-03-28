import axios from 'axios';

import {TOKEN_STORAGE, USER_STORAGE} from '@/auth/store';
import {createStore} from '@/store';
import {isAuthenticated, getAuth} from '@/auth/store';
import {setUser, setToken, refresh} from '@/store/actions/auth';
import {parseToken, setAuthHeader} from '@/auth/helpers';
import {dispatch as dispatchAuthChanged} from '@/events/authchanged';

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
  setAuthHeader(parseToken(tokenObj));

  store.dispatch(refresh());
}

// Add storage listener to listen to Auth changes
window.addEventListener('storage', (e) => {
  const {newValue} = e;
  switch (e.key) {
  case USER_STORAGE: {
    store.dispatch(setUser(
      !!newValue ? JSON.parse(newValue) : {}
    ));
    dispatchAuthChanged(!!newValue ? JSON.parse(newValue) : null);
    break;
  }
  case TOKEN_STORAGE: {
    store.dispatch(setToken(
      !!newValue ? JSON.parse(newValue) : {}
    ));
    break;
  }
  }
});

export {
  store,
};
