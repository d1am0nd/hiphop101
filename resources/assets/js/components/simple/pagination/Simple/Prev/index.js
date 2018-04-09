import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Prev = ({url}) => {
  return (
    <Link className="btn-inverse on-white" to={url}>Prev page</Link>
  );
};

Prev.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Prev;
