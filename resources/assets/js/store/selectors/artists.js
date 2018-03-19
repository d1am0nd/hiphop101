import {createSelector} from 'reselect';

const artistSelector = (store) => store.artists;
const searchSelector = (store) => artistSelector(store).search;

const getSearchInput = createSelector(
  searchSelector,
  (search) => search.input
);

// Get username: string
const getSearchList = createSelector(
  searchSelector,
  (search) => search.list
);

export {
  getSearchInput,
  getSearchList,
};
