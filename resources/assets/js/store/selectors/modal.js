import {createSelector} from 'reselect';

// Login
const loginModalSelector = store => store.modal.login;

const getLoginOpen = login => {
  return login.open;
};

const isLoginOpen = createSelector(
  loginModalSelector,
  getLoginOpen
);

// Register
const registerModalSelector = store => store.modal.register;

const getRegisterOpen = register => {
  return register.open;
};

const isRegisterOpen = createSelector(
  registerModalSelector,
  getRegisterOpen
);

export {
  isLoginOpen,
  isRegisterOpen,
};
