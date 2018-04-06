import {
  SET_POPULAR_ARTICLES,
} from '@/store/const/popular';

const initialState = {
  articles: [],
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
  }
  return state;
};
