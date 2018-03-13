import {CLOSE_MODAL} from 'store/const/modal';

const initialState = {
  open: true,
  title: 'test',
  component: {},
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
  case CLOSE_MODAL: {
    state = {
      ...state,
      open: false,
      title: '',
      component: {},
    };
    break;
  }
  }
  return state;
};

/*
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
*/
