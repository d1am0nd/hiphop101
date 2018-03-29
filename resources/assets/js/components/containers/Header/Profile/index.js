import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {logout} from '@/store/actions/auth';
import {getUsername} from '@/store/selectors/auth';
import {newArticleUrl, profileUrl} from '@/routes/routes';

const Profile = ({username, logout}) => (
  <div className="profile">
    <ul>
      <li>
        <Link to={profileUrl()}>
          {username}
        </Link>
      </li>
      <li>
        <Link to={newArticleUrl()}>
          New article
        </Link>
      </li>
      <li>
        <a
          onClick={(e) => logout()}
          href="javascript:;">Logout</a>
      </li>
    </ul>
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
