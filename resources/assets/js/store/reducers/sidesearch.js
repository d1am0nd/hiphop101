import {
  SET_SEARCH,
  SET_SEARCH_LIST,
} from '@/store/const/sidesearch';

const initialState = {
  input: '',
  list: [],
};

export const sidesearchReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_SEARCH: {
    state = {
      ...state,
      ...state.search,
      input: action.payload,
    };
    break;
  }
  case SET_SEARCH_LIST: {
    state = {
      ...state,
      list: action.payload,
    };
  }
  }
  return state;
};
