import {TOGGLE_LOGIN, TOGGLE_REGISTER} from 'store/const/modal';

// Bool open (true = open it, false = close it, empty = toggle)
const toggleLoginModal = open => {
  return (dispatch, store) => {
    dispatch({
      type: TOGGLE_LOGIN,
      payload: open === undefined ? !store().modal.login.open : open,
    });
  }
};

// Bool open (true = open it, false = close it, empty = toggle)
const toggleRegisterModal = open => {
  return (dispatch, store) => {
    dispatch({
      type: TOGGLE_REGISTER,
      payload:  open === undefined ? !store().modal.register.open : open,
    });
  }
}

export {
  toggleLoginModal,
  toggleRegisterModal,
};
