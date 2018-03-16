const TOKEN_STORAGE = 'TOKEN_STORAGE';
const USER_STORAGE = 'USER_STORAGE';

const storeAuth = (userObj, tokenObj) => {
  // Save token
  localStorage.setItem(
    TOKEN_STORAGE,
    JSON.stringify(tokenObj)
  );

  // Save user
  localStorage.setItem(
    USER_STORAGE,
    JSON.stringify(userObj)
  );
};

const getAuth = () => {
  const token = localStorage.getItem(TOKEN_STORAGE);
  const user = localStorage.getItem(USER_STORAGE);

  return (!!token && !!user) ? {
    token: JSON.parse(token),
    user: JSON.parse(user),
  } : null;
};

export {
  storeAuth,
  getAuth,
};
