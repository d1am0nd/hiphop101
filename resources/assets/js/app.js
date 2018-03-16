import ReactDOM from 'react-dom';
import React from 'react';
import axios from 'axios';

import {Provider} from 'react-redux';
import App from '@/components/App';

import {createStore} from '@/store';
import {setUser, setToken} from '@/store/actions/auth';
import {isAuthenticated, getAuth} from '@/auth/store';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';

const store = createStore();

if (isAuthenticated()) {
  const {user, token} = getAuth();
  store.dispatch(setUser(user));
  store.dispatch(setToken(token));
}

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
