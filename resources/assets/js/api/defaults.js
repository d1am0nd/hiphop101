import axios from 'axios';

import {getToken} from '@/auth/store';
import {
  createHeaderToken,
  parseToken,
} from '@/auth/helpers';

// To add token on the go
const paramsWithToken = (params = {}) => {
  const tokenObj = getToken();
  return tokenObj !== null ? {
    ...params,
    headers: {
      ...params.headers,
      Authorization: createHeaderToken(
        parseToken(
          getToken()
        )
      ),
    },
  } : {};
};

const post = (url, data = {}, params = {}) => axios
  .post(url, data, paramsWithToken(params));

const get = (url, params = {}) => axios
  .get(url, paramsWithToken(params));

export {
  post,
  get,
};
