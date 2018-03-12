import {TOGGLE_LOGIN, TOGGLE_REGISTER} from 'store/const/modal';

const initialState = {
  login: {
    open: false,
  },
  register: {
    open: false,
  },
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
  case TOGGLE_LOGIN: {
    state = {
      ...state,
      login: {
        ...state.login,
        open: action.payload,
      },
    };
    break;
  }
  case TOGGLE_REGISTER: {
    state = {
      ...state,
      register: {
        ...state.register,
        open: action.payload,
      },
    };
    break;
  }
  }
  return state;
};
