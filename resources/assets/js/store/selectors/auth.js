import {createSelector} from 'reselect';

const authSelector = (store) => store.auth;
const userSelector = (store) => authSelector(store).user;
// const tokenSelector = (auth) => auth.token;

// Is user authenticated: bool
const isUserFilled = (user) => {
  return Object.keys(user).length !== 0 ||
    user.constructor !== Object;
};

const isAuth = createSelector(
  userSelector,
  isUserFilled
);

// Get user object: object

export {
  isAuth,
};
