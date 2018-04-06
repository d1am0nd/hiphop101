import {
  SET_POPULAR_ARTICLES,
} from '@/store/const/popular';

import {getPopularArticles} from '@/api/popular';
import {getData} from '@/api/helpers';

const fetchPopularArticles = () => {
  return (dispatch) => {
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

export {
  fetchPopularArticles,
};
