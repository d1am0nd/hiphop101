import {
  SET_SEARCH,
  SET_SEARCH_LIST,
} from '@/store/const/artists';

const initialState = {
  search: {
    input: '',
    list: [],
  },
};

export const artistsReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_SEARCH: {
    state = {
      ...state,
      search: {
        ...state.search,
        input: action.payload,
      },
    };
    break;
  }
  case SET_SEARCH_LIST: {
    state = {
      ...state,
      search: {
        ...state.search,
        list: action.payload,
      },
    };
  }
  }
  return state;
};
