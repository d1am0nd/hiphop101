import {get} from './defaults';

const POPULAR_ARTICLES_URL = '/api/popular/articles';
const POPULAR_ARTISTS_URL = '/api/popular/artists';

const popularArticlesUrl = () => POPULAR_ARTICLES_URL;
const popularArtistsUrl = () => POPULAR_ARTISTS_URL;

const getPopularArticles = (pn = 1) => get(popularArticlesUrl(), {
  params: {
    page: pn,
  },
});
const getPopularArtists = (pn = 1) => get(popularArtistsUrl(), {
  params: {
    page: pn,
  },
});

export {
  getPopularArticles,
  getPopularArtists,
};
