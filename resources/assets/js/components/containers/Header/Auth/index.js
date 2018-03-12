import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
  toggleLoginModal,
  toggleRegisterModal,
} from 'store/actions/modal';

const Auth = ({openLogin, openRegister}) => (
  <div className="profile">
    <a
      onClick={e => openLogin()}
      href="javascript:;">Login</a>
    &nbsp;|&nbsp;
    <a
      onClick={e => openRegister()}
      href="javascript:;">Register</a>
  </div>
);

Auth.propTypes = {
  openLogin: PropTypes.func.isRequired,
  openRegister: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    openLogin: () => dispatch(toggleLoginModal(true)),
    openRegister: () => dispatch(toggleRegisterModal(true)),
  }
}

export default connect(null, mapDispatchToProps)(Auth);
