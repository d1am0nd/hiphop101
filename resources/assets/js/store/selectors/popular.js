import {createSelector} from 'reselect';

const mainSelector = (store) => store.popular;

const getPopularArticles = createSelector(
  mainSelector,
  (popular) => popular.articles
);

export {
  getPopularArticles,
};
