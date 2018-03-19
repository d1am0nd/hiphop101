import {searchByName} from '@/api/artists';
import {getData} from '@/api/helpers';
import {
  SET_SEARCH,
  SET_SEARCH_LIST,
} from '@/store/const/artists';

const setSearch = (input) => {
  return (dispatch) => {
    dispatch({type: SET_SEARCH, payload: input});
  };
};

const setSearchAndFetch = (input) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch({type: SET_SEARCH, payload: input});
      searchByName(input)
        .then((res) => {
          dispatch({
            type: SET_SEARCH_LIST,
            payload: getData(res),
          });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};

const clearSearch = () => {
  return (dispatch) => {
    setSearch('');
    dispatch({type: SET_SEARCH_LIST, payload: []});
  };
};

export {
  setSearch,
  clearSearch,
  setSearchAndFetch,
};
