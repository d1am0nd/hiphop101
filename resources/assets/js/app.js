import ReactDOM from 'react-dom';
import React from 'react';
import axios from 'axios';
import {BrowserRouter} from 'react-router-dom';

import {Provider} from 'react-redux';
import App from '@/components/App';

import {createStore} from '@/store';
import {setUser, setToken} from '@/store/actions/auth';
import {isAuthenticated, getAuth} from '@/auth/store';
import {getToken} from '@/auth/parsers';
import {setAuthHeader} from '@/auth/helpers';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';

const store = createStore();

if (isAuthenticated()) {
  const {
    user: userObj,
    token: tokenObj,
  } = getAuth();

  store.dispatch(setUser(userObj));
  store.dispatch(setToken(tokenObj));
  setAuthHeader(getToken(tokenObj));
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
