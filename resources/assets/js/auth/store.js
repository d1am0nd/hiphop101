const TOKEN_STORAGE = 'TOKEN_STORAGE';
const USER_STORAGE = 'USER_STORAGE';

const storeAuth = (userObj, tokenObj) => {
  // Save user
  localStorage.setItem(
    USER_STORAGE,
    JSON.stringify(userObj)
  );

  // Save token
  localStorage.setItem(
    TOKEN_STORAGE,
    JSON.stringify(tokenObj)
  );
};

const clearAuth = () => {
  localStorage.removeItem(USER_STORAGE);
  localStorage.removeItem(TOKEN_STORAGE);
};

const getAuth = () => {
  const token = localStorage.getItem(TOKEN_STORAGE);
  const user = localStorage.getItem(USER_STORAGE);

  return (!!token && !!user) ? {
    token: JSON.parse(token),
    user: JSON.parse(user),
  } : null;
};

const isAuthenticated = () => {
  return getAuth() !== null;
};

export {
  storeAuth,
  getAuth,
  clearAuth,
  isAuthenticated,
};
