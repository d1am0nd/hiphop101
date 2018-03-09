import React from 'react';
import PropTypes from 'prop-types';

const Profile = ({children}) => (
  <div className="profile">
    {!children ? 'Login | Register' : children}
  </div>
);

Profile.propTypes = {
  children: PropTypes.node,
};

export default Profile;
