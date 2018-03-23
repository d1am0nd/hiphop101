import React from 'react';
import PropTypes from 'prop-types';

const H5 = ({children, attributes}) => {
  return (
    <h5 {...attributes}>
      {children}
    </h5>
  );
};

H5.propTypes = {
  children: PropTypes.node,
  attributes: PropTypes.object,
};

export default H5;
