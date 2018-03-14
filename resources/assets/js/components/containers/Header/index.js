import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
  isAuth,
  getUsername,
} from 'store/selectors/auth';

import Title from './Title';
import Auth from './Auth';

class Header extends Component {
  render() {
    const {
      isAuth,
      getUsername,
    } = this.props;
    return (
      <header className="head">
        <Title>
          Hip Hop 101
        </Title>
        {
          isAuth ?
            getUsername :
            <Auth/>
        }
      </header>
    );
  }
}

Header.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  getUsername: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    isAuth: isAuth(state),
    getUsername: getUsername(state),
  };
};

export default connect(mapStateToProps)(Header);
