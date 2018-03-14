import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from 'store/const/modal';

const closeModal = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_MODAL,
      payload: false,
    });
  };
};

const openModal = (type, title) => {
  return (dispatch) => {
    dispatch({
      type: OPEN_MODAL,
      payload: {
        type: type,
        title: title,
      },
    });
  };
};

const openLogin = () => openModal('login', 'Login');
const openRegister = () => openModal('register', 'Register');

export {
  closeModal,
  openModal,
  openLogin,
  openRegister,
};
