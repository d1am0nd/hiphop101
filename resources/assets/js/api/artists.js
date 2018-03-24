import {post, get} from './defaults';

const ARTISTS_URL = '/api/artists';

const artistsUrl = () => ARTISTS_URL;
const artistUrl = (slug) => `${artistsUrl()}/${slug}`;
const articleUrl = (artistSlug) => `${artistsUrl()}/${artistSlug}/articles`;

const searchByName = (name) => get(
  artistsUrl(),
  {
    params: {
      search: name,
    },
  }
);

// Post new artist
const postNewArtist = (artist) => post(artistsUrl(), artist);

// Find artist by slug
const findBySlug = (slug) => get(artistUrl(slug));

// Get artist with articles
const getArtistArticles = (slug) => get(articleUrl(slug));

// Post new article for an artist
const postNewArtistArticle = (slug, article) => post(
  articleUrl(slug), article
);

export {
  searchByName,
  postNewArtist,
  findBySlug,

  getArtistArticles,
  postNewArtistArticle,
};
