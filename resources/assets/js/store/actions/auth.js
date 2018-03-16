import {
  register as registerApi,
  login as loginApi,
} from '@/api/auth';
import {SET_USER, SET_TOKEN} from '@/store/const/auth';
import {storeAuth, clearAuth} from '@/auth/store';

const setUser = (user) => {
  return (dispatch) => {
    dispatch({type: SET_USER, payload: user});
  };
};

const setToken = (token) => {
  return (dispatch) => {
    dispatch({type: SET_TOKEN, payload: token});
  };
};

const register = (userInfo) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      registerApi(userInfo)
        .then((res) => {
          const {user, token} = res.data;
          storeAuth(user, token); // Stores to localStorage
          dispatch(setUser(user));
          dispatch(setToken(token));
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};

const login = (credentials) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      loginApi(credentials)
        .then((res) => {
          const {user, token} = res.data;
          storeAuth(user, token); // Stores to localStorage
          dispatch(setUser(user));
          dispatch(setToken(token));
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};

const logout = () => {
  return (dispatch) => {
    clearAuth();
    dispatch(setUser({}));
    dispatch(setToken({}));
  };
};

export {
  setUser,
  setToken,
  register,
  login,
  logout,
};
