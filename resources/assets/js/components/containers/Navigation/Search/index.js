import React from 'react';
import PropTypes from 'prop-types';

const Search = ({placeholder}) => (
  <input
    type="text"
    placeholder={placeholder}/>
);

Search.propTypes = {
  placeholder: PropTypes.string.isRequired,
};

export default Search;
