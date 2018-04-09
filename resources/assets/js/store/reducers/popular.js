import {
  SET_POPULAR_ARTICLES,
  SET_POPULAR_ARTISTS,
} from '@/store/const/popular';

const initialState = {
  articles: {
    meta: {},
    data: [],
  },
  artists: [],
};

export const popularReducer = (state = initialState, action) => {
  const {payload} = action;
  switch (action.type) {
  case SET_POPULAR_ARTICLES: {
    state = {
      ...state,
      articles: {
        meta: payload.meta,
        data: payload.data,
      },
    };
    break;
  }
  case SET_POPULAR_ARTISTS: {
    state = {
      ...state,
      artists: {
        meta: payload.meta,
        data: payload.data,
      },
    };
    break;
  }
  }
  return state;
};
