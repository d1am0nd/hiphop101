import axios from 'axios';

const REGISTER_URL = '/api/auth/register';
const LOGIN_URL = '/api/auth/login';
const LOGOUT_URL = '/api/auth/logout';

// Requires: name, email, password, password_confirmation
const register = (registerInfo) => axios.post(REGISTER_URL, registerInfo);

// Requires: email, password
const login = (credentials) => axios.post(LOGIN_URL, credentials);

const logout = () => axios.post(LOGOUT_URL);

export {
  register,
  logout,
  login,
};
