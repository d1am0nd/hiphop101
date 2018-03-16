import {
  register as registerApi,
  login as loginApi,
} from '@/api/auth';
import {SET_USER, SET_TOKEN} from '@/store/const/auth';
import {storeAuth} from '@/auth/store';

const register = (userInfo) => {
  return (dispatch, state) => {
    return new Promise((resolve, reject) => {
      registerApi(userInfo)
        .then((res) => {
          dispatch({type: SET_USER, payload: res.data.user});
          dispatch({type: SET_TOKEN, payload: res.data.token});
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};

const login = (credentials) => {
  return (dispatch, state) => {
    return new Promise((resolve, reject) => {
      loginApi(credentials)
        .then((res) => {
          const {user, token} = res.data;
          console.log(user, token);
          storeAuth(user, token);

          dispatch({type: SET_USER, payload: user});
          dispatch({type: SET_TOKEN, payload: token});
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};

export {
  register,
  login,
};
