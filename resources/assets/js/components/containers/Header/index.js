import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
  isAuth,
} from '@/store/selectors/auth';

import Title from './Title';
import Auth from './Auth';
import Profile from './Profile';

const Header = ({isAuth}) => (
  <header className="head">
    <Title>
      Hip Hop 101
    </Title>
    {
      isAuth ?
        <Profile/> :
        <Auth/>
    }
  </header>
);

Header.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isAuth: isAuth(state),
  };
};

export default connect(mapStateToProps)(Header);
