import axios from 'axios';

const ARTISTS_URL = '/api/artists';

const searchByName = (name) => axios
  .get(ARTISTS_URL, {
    params: {
      search: name,
    },
  });

export {
  searchByName,
};
