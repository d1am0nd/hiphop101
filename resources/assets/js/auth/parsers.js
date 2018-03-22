// const getExpiresIn = (token) => token.expires_in;
const getToken = (token) => token.access_token;
const getType = (token) => token.type;

export {
  // getExpiresIn,
  getToken,
  getType,
};
