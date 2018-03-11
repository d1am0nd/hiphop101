import React from 'react';
import PropTypes from 'prop-types';

const Profile = ({children}) => (
  <div className="profile">
    <a href="javascript:;">Login</a>
    &nbsp;|&nbsp;
    <a href="javascript:;">Register</a>
  </div>
);

Profile.propTypes = {
  children: PropTypes.node,
};

export default Profile;
