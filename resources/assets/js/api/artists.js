import axios from 'axios';

const ARTISTS_URL = '/api/artists';
const NEW_ARTIST_URL = '/api/artists';

const searchByName = (name) => axios
  .get(ARTISTS_URL, {
    params: {
      search: name,
    },
  });

const postNewArtist = (artist) => axios
  .post(NEW_ARTIST_URL, artist);

export {
  searchByName,
  postNewArtist,
};
