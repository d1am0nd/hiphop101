import {createSelector} from 'reselect';
import {getToken} from '@/auth/parsers';

const authSelector = (store) => store.auth;
const userSelector = (store) => authSelector(store).user;
const tokenSelector = (store) => authSelector(store).token;

// Is user authenticated: bool
const isUserFilled = (user) => {
  return Object.keys(user).length !== 0 ||
    user.constructor !== Object;
};

const isAuth = createSelector(
  userSelector,
  isUserFilled
);

// Get username: string
const getUsername = createSelector(
  userSelector,
  (user) => user.name
);

// Get full bearer token: string
const getBearerToken = createSelector(
  tokenSelector,
  (token) => `bearer ${getToken(token)}`
);

export {
  isAuth,
  getUsername,
  getBearerToken,
};
