import React from 'react';
import PropTypes from 'prop-types';

const H6 = ({children, attributes}) => {
  return (
    <h6 {...attributes}>
      {children}
    </h6>
  );
};

H6.propTypes = {
  children: PropTypes.node,
  attributes: PropTypes.object,
};

export default H6;
