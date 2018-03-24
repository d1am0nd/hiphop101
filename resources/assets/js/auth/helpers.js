import axios from 'axios';

// Parsers
// const getExpiresIn = (token) => token.expires_in;
const parseToken = (token) => token.access_token;
const parseType = (token) => token.type;

// Create valid header value */
const createHeaderToken = (accessToken) => `Bearer ${accessToken}`;

// Set axios defaults
const setAuthHeader = (token) => {
  // Set Axios default headers to pass
  // the bearer token
  axios.defaults.headers.common['Authorization'] = createHeaderToken(token);
};

const removeAuthHeader = () => {
  delete axios.defaults.headers.common['Authorization'];
};

export {
  parseToken,
  parseType,

  createHeaderToken,

  setAuthHeader,
  removeAuthHeader,
};
