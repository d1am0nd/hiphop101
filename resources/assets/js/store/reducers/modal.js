import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from 'store/const/modal';

const initialState = {
  open: false,
  info: {
    type: '',
    title: '',
  },
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
  case OPEN_MODAL: {
    state = {
      ...state,
      open: true,
      info: {
        type: action.payload.type,
        title: action.payload.title,
      },
    };
  }
  }
  return state;
};
