import {register, login} from 'api/auth';

import {SET_USER, SET_TOKEN} from 'store/const/auth';

const register = userInfo => {
  return (dispatch, state) => {
    return new Promise((resolve, reject) => {
      register(userInfo)
        .then(res => {
          dispatch({type: SET_USER, payload: res.data.user});
          dispatch({type: SET_TOKEN, payload: res.data.token});
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

const login = credentials => {
  return (dispatch, state) => {
    return new Promise((resolve, reject) => {
      login(credentials)
        .then(res => {
          dispatch({type: SET_USER, payload: res.data.user});
          dispatch({type: SET_TOKEN, payload: res.data.token});
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    })
  }
};

export {
  register,
  login,
};
