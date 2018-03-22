import axios from 'axios';

const REGISTER_URL = '/api/auth/register';
const LOGIN_URL = '/api/auth/login';
const LOGOUT_URL = '/api/auth/logout';
const REFRESH_URL = '/api/auth/refresh';

// Requires: name, email, password, password_confirmation
const register = (registerInfo) => axios.post(REGISTER_URL, registerInfo);

// Requires: email, password
const login = (credentials) => axios.post(LOGIN_URL, credentials);

const logout = () => axios.post(LOGOUT_URL);

const refreshToken = () => axios.post(REFRESH_URL);

export {
  register,
  logout,
  login,
  refreshToken,
};
