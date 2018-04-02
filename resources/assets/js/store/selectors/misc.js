import {createSelector} from 'reselect';

const miscSelector = (store) => store.misc;
const loadingSelector = (store) => miscSelector(store).loading;

const isLoading = createSelector(
  loadingSelector,
  (loading) => !!loading.isLoading
);

export {
  isLoading,
};
