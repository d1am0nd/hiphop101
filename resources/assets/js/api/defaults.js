import axios from 'axios';

import {getToken} from '@/auth/store';
import {getToken as parseToken} from '@/auth/parsers';
import {createHeaderToken} from '@/auth/helpers';

// To add token on the go
const paramsWithToken = (params = {}) => {
  return {
    ...params,
    headers: {
      ...params.headers,
      Authorization: createHeaderToken(
        parseToken(
          getToken()
        )
      ),
    },
  };
};

const authPost = (url, data = {}, params = {}) => axios
  .post(url, data, paramsWithToken(params));

const authGet = (url, params = {}) => axios
  .get(url, paramsWithToken(params));

export {
  authPost,
  authGet,
};
