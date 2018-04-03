import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from '@/store/const/modal';

const initialState = {
  open: false,
  info: {
    type: 'k',
    title: '',
    bottom: '',
  },
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
  case CLOSE_MODAL: {
    state = {
      ...state,
      open: false,
      info: {
        type: '',
        title: '',
      },
    };
    break;
  }
  case OPEN_MODAL: {
    state = {
      ...state,
      open: true,
      info: {
        ...action.payload,
      },
    };
  }
  }
  return state;
};
