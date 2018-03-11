import ReactDOM from 'react-dom';
import React from 'react';
import axios from 'axios';

import {Provider} from 'react-redux';
import App from './components/App';

import {createStore} from 'store';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';

ReactDOM.render(
  <Provider store={createStore()}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
