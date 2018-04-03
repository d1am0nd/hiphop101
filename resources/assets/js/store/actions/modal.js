import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from '@/store/const/modal';

const closeModal = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_MODAL,
      payload: false,
    });
  };
};

const openModal = (type, title, bottom = '') => {
  return (dispatch) => {
    dispatch({
      type: OPEN_MODAL,
      payload: {
        type: type,
        title: title,
        bottom: bottom,
      },
    });
  };
};

const openLogin = () => openModal('login', 'Login');
const openRegister = () => openModal('register', 'Register');
const openKhaled = (title, bottom) => openModal('khaled', title, bottom);

export {
  closeModal,
  openModal,
  openLogin,
  openKhaled,
  openRegister,
};
