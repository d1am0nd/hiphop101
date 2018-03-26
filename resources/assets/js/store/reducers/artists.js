import {
  SET_ARTIST,
  SET_ARTICLE,
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
};

export const artistReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_ARTIST: {
    state = {
      ...state,
      artist: action.payload,
    };
    break;
  }
  case SET_ARTICLE: {
    state = {
      ...state,
      article: action.payload,
    };
    break;
  }
  }
  return state;
};