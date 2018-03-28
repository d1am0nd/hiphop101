import {createSelector} from 'reselect';

const mainSelector = (store) => store.artist;
const artistSelector = (store) => mainSelector(store).artist;
const articleSelector = (store) => mainSelector(store).article;
const articlesSelector = (store) => mainSelector(store).articles;

const getArtist = createSelector(
  artistSelector,
  (artist) => artist
);

const getArticle = createSelector(
  articleSelector,
  (article) => article
);

const getArticles = createSelector(
  articlesSelector,
  (articles) => articles
);

const isArticleLiked = createSelector(
  articleSelector,
  (article) => article.liked === 1
);

export {
  getArtist,
  getArticle,
  getArticles,
  isArticleLiked,
};
