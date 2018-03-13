import {CLOSE_MODAL} from 'store/const/modal';

const closeModal = () => {
  return (dispatch, store) => {
    dispatch({
      type: CLOSE_MODAL,
      payload: false,
    });
  }
};

export {
  closeModal,
};
