const artistUrl = (slug) => `/artists/${slug}`;
const articleUrl = (artistSlug, prefix, articleSlug) => {
  return `${artistUrl(artistSlug)}/${prefix}/${articleSlug}`;
};
const newArticleUrl = (artistSlug) => `${artistSlug}/articles/new`;
const newArtistUrl = () => `/artist/new`;
const newArtistArticleUrl = (slug) => `/articles/${slug}/new`;

export {
  artistUrl,
  articleUrl,
  newArtistUrl,
  newArticleUrl,
  newArtistArticleUrl,
};
