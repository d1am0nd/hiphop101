import {post} from './defaults';

const REGISTER_URL = '/api/auth/register';
const LOGIN_URL = '/api/auth/login';
const LOGOUT_URL = '/api/auth/logout';
const REFRESH_URL = '/api/auth/refresh';

const registerUrl = () => REGISTER_URL;
const loginUrl = () => LOGIN_URL;
const logoutUrl = () => LOGOUT_URL;
const refreshUrl = () => REFRESH_URL;

// Requires: name, email, password, password_confirmation
const register = (registerInfo) => post(registerUrl(), registerInfo);

// Requires: email, password
const login = (credentials) => post(loginUrl(), credentials);

const logout = () => post(logoutUrl());

const refreshToken = () => post(refreshUrl());

export {
  register,
  logout,
  login,
  refreshToken,
};
