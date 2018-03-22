import {
  register as registerApi,
  logout as logoutApi,
  login as loginApi,
} from '@/api/auth';
import {getData} from '@/api/helpers';
import {SET_USER, SET_TOKEN} from '@/store/const/auth';
import {storeAuth, clearAuth} from '@/auth/store';
import {getToken} from '@/auth/parsers';
import {
  setAuthHeader,
  removeAuthHeader,
} from '@/auth/helpers';

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
          const {user, token} = getData(res);
          storeAuth(user, token); // Stores to localStorage
          dispatch(setUser(user));
          dispatch(setToken(token));
          setAuthHeader(getToken(token));
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
          const {user, token} = getData(res);
          storeAuth(user, token); // Stores to localStorage
          dispatch(setUser(user));
          dispatch(setToken(token));
          setAuthHeader(getToken(token));
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
    return new Promise((resolve, reject) => {
      removeAuthHeader();
      dispatch(setUser({}));
      dispatch(setToken({}));
      clearAuth();

      logoutApi()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};

export {
  setUser,
  setToken,
  register,
  login,
  logout,
};
