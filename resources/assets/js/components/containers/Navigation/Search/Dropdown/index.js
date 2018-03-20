import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {getSearchList} from '@/store/selectors/sidesearch';
import {clearSearch} from '@/store/actions/sidesearch';

import {artistUrl} from '@/routes/routes';

const Dropdown = ({artists, clearSearch}) => (
  <ul
    className={artists.length === 0 ? 'hide' : ''}>
    {artists.map(({name, slug}, i) => (
      <li
        onClick={() => clearSearch()}
        key={i}>
        <Link
          to={artistUrl(slug)}>
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
