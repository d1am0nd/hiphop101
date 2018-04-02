import {
  SET_LOADING,
} from '@/store/const/misc';

const setLoading = (isLoading) => {
  console.log('setting', isLoading);
  return (dispatch) => {
    dispatch({type: SET_LOADING, payload: isLoading});
  };
};

export {
  setLoading,
};
