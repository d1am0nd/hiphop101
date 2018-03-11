import axios from 'axios';

const REGISTER_URL = '/api/auth/register';
const LOGIN_URL = '/api/auth/login';

// Requires: name, email, password, password_confirmation
export const register(registerInfo) {
  return axios.post(REGISTER_URL, registerInfo);
}

// Requires: email, password
export const login(credentials) {
  return axios.post(LOGIN_URL, credentials);
}
