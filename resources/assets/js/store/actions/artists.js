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
import {
  myArticles,
  deleteArticle,
} from '@/api/auth';
import {getData, getParent, getMeta} from '@/api/helpers';

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

const setArticles = (articles, meta) => {
  return (dispatch) => {
    dispatch({type: SET_ARTICLES, payload: {
      data: articles,
      meta: meta,
    }});
  };
};

const fetchArtistWithArticles = (artistSlug) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      getArtistArticles(artistSlug)
        .then((res) => {
          dispatch(setArtist(getParent(res)));
          dispatch(setArticles(
            getData(res),
            getMeta(res)
          ));
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

const fetchMyArticles = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      myArticles()
        .then((res) => {
          dispatch(setArticles(getData(res)));
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};

const deleteMyArticle = (id) => {
  return (dispatch, store) => {
    return new Promise((resolve, reject) => {
      deleteArticle(id)
        .then((res) => {
          dispatch(setArticles(
            store().artist.articles.filter((article) => {
              return article.id !== id;
            })
          ));
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
  fetchMyArticles,
  fetchArtistWithArticles,
  deleteMyArticle,
  likeArticle,
  unlikeArticle,
};
