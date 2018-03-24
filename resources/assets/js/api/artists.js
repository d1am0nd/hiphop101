import axios from 'axios';
import {authPost} from './defaults';

const ARTISTS_URL = '/api/artists';
const NEW_ARTIST_URL = '/api/artists';

const articleUrl = (artistSlug) => `${ARTISTS_URL}/${artistSlug}/articles`;

const searchByName = (name) => axios
  .get(ARTISTS_URL, {
    params: {
      search: name,
    },
  });

const postNewArtist = (artist) => authPost(NEW_ARTIST_URL, artist);

const findBySlug = (slug) => axios
  .get(`${ARTISTS_URL}/${slug}`);

const postNewArtistArticle = (slug, article) => authPost(
  articleUrl(slug), article
);

export {
  searchByName,
  postNewArtist,
  findBySlug,

  postNewArtistArticle,
};
