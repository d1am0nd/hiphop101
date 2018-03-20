import React from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({artists, handleArtistClick, show}) => (
  <ul
    className={
      show === false || artists.length === 0 ? 'hide' : ''}>
    {artists.map((artist, i) => (
      <li
        onClick={(e) => handleArtistClick(e, artist)}
        key={i}>
        {artist.name}
      </li>
    ))}
  </ul>
);

Dropdown.propTypes = {
  show: PropTypes.bool,
  artists: PropTypes.array.isRequired,
  handleArtistClick: PropTypes.func.isRequired,
};

export default Dropdown;
