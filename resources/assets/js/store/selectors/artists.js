import {createSelector} from 'reselect';

const mainSelector = (store) => store.artist;
const artistSelector = (store) => mainSelector(store).artist;
const articleSelector = (store) => mainSelector(store).article;
const articlesSelector = (store) => mainSelector(store).articles;
const articlesDataSelector = (store) => articlesSelector(store).data;
const articlesMetaSelector = (store) => articlesSelector(store).meta;

const getArtist = createSelector(
  artistSelector,
  (artist) => artist
);

const getArticle = createSelector(
  articleSelector,
  (article) => article
);

const getArticleUser = createSelector(
  articleSelector,
  (article) => article.user ? article.user : {}
);

const getArticles = createSelector(
  articlesDataSelector,
  (articles) => articles
);

const getArticlesNextPage = createSelector(
  articlesMetaSelector,
  (meta) => meta.current_page < meta.last_page ?
    (meta.current_page + 1) : null
);

const getArticlesPrevPage = createSelector(
  articlesMetaSelector,
  (meta) => meta.current_page > 1 ?
    (meta.current_page - 1) : null
);

const getMyArticles = createSelector(
  articlesDataSelector,
  (articles) => articles.filter(
    (article) => typeof article.artist !== 'undefined'
  )
);

const isArticleLiked = createSelector(
  articleSelector,
  (article) => article.liked === 1
);

export {
  getArtist,
  getArticle,
  getArticles,
  getArticleUser,
  getMyArticles,
  isArticleLiked,
  getArticlesPrevPage,
  getArticlesNextPage,
};
