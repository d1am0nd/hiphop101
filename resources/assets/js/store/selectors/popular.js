import {createSelector} from 'reselect';

const mainSelector = (store) => store.popular;

const articlesSelector = (store) => mainSelector(store).articles;
const articlesMetaSelector = (store) => articlesSelector(store).meta;

const getPopularArticles = createSelector(
  articlesSelector,
  (articles) => articles.data
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

export {
  getPopularArticles,
  getArticlesNextPage,
  getArticlesPrevPage,
};
