import {createSelector} from 'reselect';
import {parseToken, createHeaderToken} from '@/auth/helpers';

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

const getUser = createSelector(
  userSelector,
  (user) => user
);

// Get username: string
const getUsername = createSelector(
  userSelector,
  (user) => user.name
);

// Get full bearer token: string
const getBearerToken = createSelector(
  tokenSelector,
  (token) => createHeaderToken(parseToken(token))
);

export {
  isAuth,
  getUser,
  getUsername,
  getBearerToken,
};
