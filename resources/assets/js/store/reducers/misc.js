import {SET_LOADING} from '@/store/const/misc';

const initialState = {
  loading: {
    isLoading: false,
  },
};

export const miscReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_LOADING: {
    state = {
      ...state,
      loading: {
        ...state.loading,
        isLoading: action.payload,
      },
    };
    break;
  }
  }
  return state;
};
