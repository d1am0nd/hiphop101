import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Next = ({url}) => {
  return (
    <Link className="btn-inverse on-white" to={url}>Next page</Link>
  );
};

Next.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Next;
