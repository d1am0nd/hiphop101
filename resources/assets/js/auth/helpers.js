import axios from 'axios';

const createHeaderToken = (accessToken) => `Bearer ${accessToken}`;

const setAuthHeader = (token) => {
  // Set Axios default headers to pass
  // the bearer token
  axios.defaults.headers.common['Authorization'] = createHeaderToken(token);
};

const removeAuthHeader = () => {
  delete axios.defaults.headers.common['Authorization'];
};

export {
  createHeaderToken,
  setAuthHeader,
  removeAuthHeader,
};
