import {searchByName} from '@/api/artists';
import {getData} from '@/api/helpers';
import {
  SET_SEARCH,
  SET_SEARCH_LIST,
} from '@/store/const/sidesearch';

const setSearch = (input) => {
  return (dispatch) => {
    dispatch({type: SET_SEARCH, payload: input});
  };
};

const setList = (list) => {
  return (dispatch) => {
    dispatch({type: SET_SEARCH_LIST, payload: list});
  };
};

const setSearchAndFetch = (input) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(setSearch(input));
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
    dispatch(setSearch(''));
    dispatch(setList([]));
  };
};

export {
  setSearch,
  clearSearch,
  setSearchAndFetch,
};
