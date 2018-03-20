import {createSelector} from 'reselect';

const sidesearchSelector = (store) => store.sidesearch;

const getSearchInput = createSelector(
  sidesearchSelector,
  (search) => search.input
);

// Get username: string
const getSearchList = createSelector(
  sidesearchSelector,
  (search) => search.list
);

export {
  getSearchInput,
  getSearchList,
};
