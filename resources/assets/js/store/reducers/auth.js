import {SET_USER, SET_TOKEN} from '@/store/const/auth';

const initialState = {
  user: {},
  token: {},
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_USER: {
    state = {
      ...state,
      user: action.payload,
    };
    break;
  }
  case SET_TOKEN: {
    state = {
      ...state,
      token: action.payload,
    };
    break;
  }
  }
  return state;
};
