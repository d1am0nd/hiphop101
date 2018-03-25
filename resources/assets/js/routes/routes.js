const artistUrl = (slug) => `/artists/${slug}`;
const articleUrl = (artistSlug, prefix, articleSlug) => {
  return `${artistUrl(artistSlug)}/${prefix}/${articleSlug}`;
};
const newArticleUrl = () => `/articles/new`;
const newArtistUrl = () => `/artist/new`;
const newArtistArticleUrl = (slug) => `/articles/${slug}/new`;

const profileUrl = () => `/profile`;

export {
  artistUrl,
  articleUrl,

  newArtistUrl,
  newArticleUrl,
  newArtistArticleUrl,

  profileUrl,
};
