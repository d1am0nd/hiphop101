import axios from 'axios';

const ARTISTS_URL = '/api/artists';
const NEW_ARTIST_URL = '/api/artists';

const articleUrl = (artistSlug) => `${ARTISTS_URL}/${artistSlug}/articles`;

const searchByName = (name) => axios
  .get(ARTISTS_URL, {
    params: {
      search: name,
    },
  });

const postNewArtist = (artist) => axios
  .post(NEW_ARTIST_URL, artist);

const findBySlug = (slug) => axios
  .get(`${ARTISTS_URL}/${slug}`);

const postNewArtistArticle = (slug, article) => axios
  .post(articleUrl(slug), article);

export {
  searchByName,
  postNewArtist,
  findBySlug,

  postNewArtistArticle,
};
