import {
  register as registerApi,
  logout as logoutApi,
  login as loginApi,
  refreshToken as refreshApi,
} from '@/api/auth';
import {getData} from '@/api/helpers';
import {SET_USER, SET_TOKEN} from '@/store/const/auth';
import {storeToken, storeAuth, clearAuth} from '@/auth/store';
import {
  parseToken,
  setAuthHeader,
  removeAuthHeader,
} from '@/auth/helpers';

const loginFacade = (dispatch, user, token) => {
  storeAuth(user, token); // Stores to localStorage
  dispatch(setUser(user)); // Sets redux user
  dispatch(setToken(token)); // Sets redux token
  setAuthHeader(parseToken(token)); // Sets axios header defaults
};

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
          loginFacade(dispatch, user, token);
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
          loginFacade(dispatch, user, token);
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
      dispatch(setUser({}));
      dispatch(setToken({}));
      clearAuth();

      logoutApi()
        .then((res) => {
          removeAuthHeader();
          resolve(res);
        })
        .catch((err) => {
          removeAuthHeader();
          reject(err);
        });
    });
  };
};

const refresh = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      refreshApi()
        .then((res) => {
          const token = getData(res);
          storeToken(token); // Stores to localStorage
          dispatch(setToken(token)); // Sets redux token
          setAuthHeader(parseToken(token)); // Sets axios header defaults
        })
        .catch((err) => {
          dispatch(setUser({}));
          dispatch(setToken({}));
          clearAuth();
          removeAuthHeader();
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
  refresh,
};
