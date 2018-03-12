import {TOGGLE_LOGIN, TOGGLE_REGISTER} from 'store/const/modal';

// Bool open (true = open it, false = close it, null = toggle)
const toggleLoginModal = open => {
  return (dispatch, store) => {
    dispatch({
      type: TOGGLE_LOGIN,
      payload: !open ? !store().modal.login.open : open,
    });
  }
};

// Bool open (true = open it, false = close it, null = toggle)
const toggleRegisterModal = open => {
  return (dispatch, store) => {
    dispatch({
      type: TOGGLE_REGISTER,
      payload: !open ? !store().modal.register.open : open,
    });
  }
}

export {
  toggleLoginModal,
  toggleRegisterModal,
};
