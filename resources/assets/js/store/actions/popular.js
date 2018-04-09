import {
  SET_POPULAR_ARTICLES,
  SET_POPULAR_ARTISTS,
} from '@/store/const/popular';

import {
  getPopularArticles,
  getPopularArtists,
} from '@/api/popular';
import {getData, getMeta} from '@/api/helpers';

const fetchPopularArticles = (pn = null) => {
  return (dispatch, store) => {
    return new Promise((resolve, reject) => {
      getPopularArticles(pn ? pn : 1)
        .then((res) => {
          dispatch({
            type: SET_POPULAR_ARTICLES,
            payload: {
              meta: getMeta(res),
              data: getData(res),
            },
          });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};

const fetchPopularArtists = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      getPopularArtists()
        .then((res) => {
          dispatch({
            type: SET_POPULAR_ARTISTS,
            payload: {
              meta: getMeta(res),
              data: getData(res),
            },
          });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};

export {
  fetchPopularArticles,
  fetchPopularArtists,
};
