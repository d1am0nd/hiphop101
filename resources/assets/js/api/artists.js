import {post, get} from './defaults';

const ARTISTS_URL = '/api/artists';

const artistsUrl = () => ARTISTS_URL;
const artistUrl = (slug) => `${artistsUrl()}/${slug}`;
const articlesUrl = (artistSlug) => `${artistsUrl()}/${artistSlug}/articles`;
const articleUrl = (artistSlug, prefix, articleSlug) => {
  return `${articlesUrl(artistSlug)}/${prefix}/${articleSlug}`;
};
const articleLikeUrl = (artistSlug, prefix, articleSlug) => {
  return `${articleUrl(artistSlug, prefix, articleSlug)}/like`;
};
const articleUnlikeUrl = (artistSlug, prefix, articleSlug) => {
  return `${articleUrl(artistSlug, prefix, articleSlug)}/unlike`;
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
  articlesUrl(slug), article
);

const likeArticle = (artistSlug, prefix, articleSlug) => post(
  articleLikeUrl(artistSlug, prefix, articleSlug)
);

const unlikeArticle = (artistSlug, prefix, articleSlug) => post(
  articleUnlikeUrl(artistSlug, prefix, articleSlug)
);

export {
  searchByName,
  postNewArtist,
  findArtist,
  findArticle,

  getArtistArticles,
  postNewArtistArticle,
  likeArticle,
  unlikeArticle,
};
