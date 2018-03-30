const artistUrl = (slug) => `/artists/${slug}`;
const articleUrl = (artistSlug, prefix, articleSlug) => {
  return `${artistUrl(artistSlug)}/${prefix}/${articleSlug}`;
};
const newArticleUrl = () => `/articles/new`;
const newArtistUrl = () => `/artist/new`;
const newArtistArticleUrl = (slug) => `/articles/${slug}/new`;
const editArticleUrl = (id) => `/articles/id/${id}`;

const profileUrl = () => `/profile`;

const aboutUrl = () => `/about`;

export {
  artistUrl,
  articleUrl,

  newArtistUrl,
  newArticleUrl,
  newArtistArticleUrl,

  editArticleUrl,

  profileUrl,

  aboutUrl,
};
