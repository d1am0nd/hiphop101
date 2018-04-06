import {
  SET_POPULAR_ARTICLES,
  SET_POPULAR_ARTISTS,
} from '@/store/const/popular';

const initialState = {
  articles: [],
  artists: [],
};

export const popularReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_POPULAR_ARTICLES: {
    state = {
      ...state,
      articles: action.payload,
    };
    break;
  }
  case SET_POPULAR_ARTISTS: {
    state = {
      ...state,
      artists: action.payload,
    };
    break;
  }
  }
  return state;
};
