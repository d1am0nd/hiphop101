import {get} from './defaults';

const POPULAR_ARTICLES_URL = '/api/popular/articles';

const popularArticlesUrl = () => POPULAR_ARTICLES_URL;

const getPopularArticles = () => get(popularArticlesUrl());

export {
  getPopularArticles,
};
