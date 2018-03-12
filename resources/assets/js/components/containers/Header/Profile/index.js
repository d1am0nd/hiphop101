import React from 'react';
import PropTypes from 'prop-types';

const Profile = ({children}) => (
  <div className="profile">
    {children}
  </div>
);

Profile.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Profile;
