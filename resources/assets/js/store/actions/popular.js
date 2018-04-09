import {
  SET_POPULAR_ARTICLES,
  SET_POPULAR_ARTISTS,
} from '@/store/const/popular';

import {
  getPopularArticles,
  getPopularArtists,
} from '@/api/popular';
import {getData} from '@/api/helpers';

const fetchPopularArticles = () => {
  return (dispatch, store) => {
    return new Promise((resolve, reject) => {
      getPopularArticles()
        .then((res) => {
          dispatch({
            type: SET_POPULAR_ARTICLES,
            payload: getData(res),
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
            payload: getData(res),
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
