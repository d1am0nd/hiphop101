import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {getSearchList} from '@/store/selectors/artists';
import {clearSearch} from '@/store/actions/artists';

import {artistRoute} from '@/routes/factories';

const Dropdown = ({artists, clearSearch}) => (
  <ul
    className={artists.length === 0 ? 'hide' : ''}>
    {artists.map(({name, slug}, i) => (
      <li
        onClick={() => clearSearch()}
        key={i}>
        <Link
          to={artistRoute(slug)}>
          {name}
        </Link>
      </li>
    ))}
  </ul>
);

Dropdown.propTypes = {
  artists: PropTypes.array.isRequired,
  clearSearch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    artists: getSearchList(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearSearch: () => dispatch(clearSearch()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dropdown);
