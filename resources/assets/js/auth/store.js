const TOKEN_STORAGE = 'TOKEN_STORAGE';
const USER_STORAGE = 'USER_STORAGE';

const storeUser = (userObj) => {
  // Save user
  localStorage.setItem(
    USER_STORAGE,
    JSON.stringify(userObj)
  );
};

const storeToken = (tokenObj) => {
  // Save token
  localStorage.setItem(
    TOKEN_STORAGE,
    JSON.stringify(tokenObj)
  );
};

const storeAuth = (userObj, tokenObj) => {
  storeUser(userObj);
  storeToken(tokenObj);
};

const clearAuth = () => {
  localStorage.removeItem(USER_STORAGE);
  localStorage.removeItem(TOKEN_STORAGE);
};

const getToken = () => {
  const token = localStorage.getItem(TOKEN_STORAGE);
  return !!token ? JSON.parse(token) : null;
};

const getUser = () => {
  const user = localStorage.getItem(USER_STORAGE);
  return !!user ? JSON.parse(user) : null;
};

const getAuth = () => {
  const token = getToken();
  const user = getUser();

  return (!!token && !!user) ? {
    token,
    user,
  } : null;
};

const isAuthenticated = () => {
  return getAuth() !== null;
};

export {
  storeUser,
  storeToken,
  storeAuth,
  getToken,
  getUser,
  getAuth,
  clearAuth,
  isAuthenticated,
};
