import {
  SET_ARTIST,
  SET_ARTICLE,
  SET_ARTICLES,
} from '@/store/const/artists';
import {
  values as artistObj,
} from '@/objects/artist';
import {
  values as articleObj,
} from '@/objects/article';

const initialState = {
  artist: {
    ...artistObj,
  },
  article: {
    ...articleObj,
  },
  articles: {
    data: [],
    meta: {},
  },
};

export const artistReducer = (state = initialState, action) => {
  const {payload} = action;
  switch (action.type) {
  case SET_ARTIST: {
    state = {
      ...state,
      artist: payload,
    };
    break;
  }
  case SET_ARTICLE: {
    state = {
      ...state,
      article: payload,
    };
    break;
  }
  case SET_ARTICLES: {
    state = {
      ...state,
      articles: {
        data: payload.data,
        meta: payload.meta,
      },
    };
    break;
  }
  }
  return state;
};
