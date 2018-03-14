import axios from 'axios';

const REGISTER_URL = '/api/auth/register';
const LOGIN_URL = '/api/auth/login';

// Requires: name, email, password, password_confirmation
const register = (registerInfo) => {
  return axios.post(REGISTER_URL, registerInfo);
};

// Requires: email, password
const login = (credentials) => {
  return axios.post(LOGIN_URL, credentials);
};

export {
  register,
  login,
};
