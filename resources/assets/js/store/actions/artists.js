import {
  SET_ARTIST,
  SET_ARTICLE,
  SET_ARTICLES,
} from '@/store/const/artists';
import {
  getArtistArticles,
  findArticle,
  likeArticle as likeApi,
  unlikeArticle as unlikeApi,
} from '@/api/artists';
import {getData, getParent} from '@/api/helpers';

const setArtist = (artist) => {
  return (dispatch) => {
    dispatch({type: SET_ARTIST, payload: artist});
  };
};

const setArticle = (article) => {
  return (dispatch) => {
    dispatch({type: SET_ARTICLE, payload: article});
  };
};

const setArticles = (articles) => {
  return (dispatch) => {
    dispatch({type: SET_ARTICLES, payload: articles});
  };
};

const fetchArtistWithArticles = (artistSlug) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      getArtistArticles(artistSlug)
        .then((res) => {
          dispatch(setArtist(getParent(res)));
          dispatch(setArticles(getData(res)));
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};

const fetchArticle = (
  artistSlug,
  prefix,
  articleSlug
) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      findArticle(
        artistSlug,
        prefix,
        articleSlug
      )
        .then((res) => {
          dispatch(setArticle(getData(res)));
          dispatch(setArtist(getParent(res)));
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};

const likeArticle = (
  artistSlug,
  prefix,
  articleSlug
) => {
  return (dispatch, state) => {
    return new Promise((resolve, reject) => {
      likeApi(
        artistSlug,
        prefix,
        articleSlug
      )
        .then((res) => {
          if (getData(res) === true) {
            const {article} = state().artist;
            dispatch(setArticle({
              ...article,
              likes_count: ++article.likes_count,
              liked: 1,
            }));
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};

const unlikeArticle = (
  artistSlug,
  prefix,
  articleSlug
) => {
  return (dispatch, state) => {
    return new Promise((resolve, reject) => {
      unlikeApi(
        artistSlug,
        prefix,
        articleSlug
      )
        .then((res) => {
          if (getData(res) === true) {
            const {article} = state().artist;
            dispatch(setArticle({
              ...article,
              likes_count: --article.likes_count,
              liked: 0,
            }));
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};

export {
  fetchArtist,
  fetchArticle,
  fetchArtistWithArticles,
  likeArticle,
  unlikeArticle,
};
