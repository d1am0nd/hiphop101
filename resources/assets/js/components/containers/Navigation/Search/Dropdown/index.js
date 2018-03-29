import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {artistUrl} from '@/routes/routes';

const Dropdown = ({artists, handleClick}) => (
  <ul
    className={artists.length === 0 ? 'hide' : ''}>
    {artists.map(({name, slug}, i) => (
      <li
        key={i}>
        <Link
          onClick={(e) => handleClick(e)}
          to={artistUrl(slug)}>
          {name}
        </Link>
      </li>
    ))}
  </ul>
);

Dropdown.propTypes = {
  artists: PropTypes.array.isRequired,
  handleClick: PropTypes.func,
};

export default Dropdown;
