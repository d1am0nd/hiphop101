import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {logout} from '@/store/actions/auth';
import {getUsername} from '@/store/selectors/auth';

const Profile = ({username, logout}) => (
  <div className="profile">
    {username}
    &nbsp;|&nbsp;
    <a
      onClick={(e) => logout()}
      href="javascript:;">Logout</a>
  </div>
);

Profile.propTypes = {
  username: PropTypes.string,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    username: getUsername(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
