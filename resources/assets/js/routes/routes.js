const artistUrl = (slug) => `/artists/${slug}`;
const newArticleUrl = () => `/articles/new`;
const newArtistUrl = () => `/artist/new`;
const newArtistArticleUrl = (slug) => `/articles/${slug}/new`;

export {
  artistUrl,
  newArtistUrl,
  newArticleUrl,
  newArtistArticleUrl,
};
