import {get} from './defaults';

const POPULAR_ARTICLES_URL = '/api/popular/articles';
const POPULAR_ARTISTS_URL = '/api/popular/artists';

const popularArticlesUrl = () => POPULAR_ARTICLES_URL;
const popularArtistsUrl = () => POPULAR_ARTISTS_URL;

const getPopularArticles = () => get(popularArticlesUrl());
const getPopularArtists = () => get(popularArtistsUrl());

export {
  getPopularArticles,
  getPopularArtists,
};
