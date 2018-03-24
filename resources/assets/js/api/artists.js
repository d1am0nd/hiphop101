import {post, get} from './defaults';

const ARTISTS_URL = '/api/artists';

const artistsUrl = () => ARTISTS_URL;
const artistUrl = (slug) => `${artistsUrl()}/${slug}`;
const articlesUrl = (artistSlug) => `${artistsUrl()}/${artistSlug}/articles`;
const articleUrl = (artistSlug, prefix, articleSlug) => {
  return `${articlesUrl(artistSlug)}/${prefix}/${articleSlug}`;
};

const searchByName = (name) => get(
  artistsUrl(),
  {
    params: {
      search: name,
    },
  }
);

// Find artist by slug
const findArtist = (slug) => get(artistUrl(slug));

const findArticle = (artistSlug, prefix, articleSlug) => get(
  articleUrl(artistSlug, prefix, articleSlug)
);

// Get artist with articles
const getArtistArticles = (slug) => get(articlesUrl(slug));

// Post new artist
const postNewArtist = (artist) => post(artistsUrl(), artist);

// Post new article for an artist
const postNewArtistArticle = (slug, article) => post(
  articleUrl(slug), article
);

export {
  searchByName,
  postNewArtist,
  findArtist,
  findArticle,

  getArtistArticles,
  postNewArtistArticle,
};
