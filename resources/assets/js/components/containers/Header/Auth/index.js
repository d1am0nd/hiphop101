import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
  openLogin,
  openRegister,
} from '@/store/actions/modal';

const Auth = ({openLogin, openRegister}) => (
  <div className="profile">
    <ul>
      <li>
        <a
          onClick={(e) => openLogin(e)}
          href="javascript:;">Login</a>
      </li>
      <li>
        <a
          onClick={(e) => openRegister(e)}
          href="javascript:;">Register</a>
      </li>
    </ul>
  </div>
);

Auth.propTypes = {
  openLogin: PropTypes.func.isRequired,
  openRegister: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    openLogin: (e) => {
      e.stopPropagation();
      dispatch(openLogin());
    },
    openRegister: (e) => {
      e.stopPropagation();
      dispatch(openRegister());
    },
  };
};

export default connect(null, mapDispatchToProps)(Auth);
