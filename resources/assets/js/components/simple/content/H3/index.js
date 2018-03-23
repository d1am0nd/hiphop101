import React from 'react';
import PropTypes from 'prop-types';

const H3 = ({children, attributes}) => {
  return (
    <h3 {...attributes}>
      {children}
    </h3>
  );
};

H3.propTypes = {
  children: PropTypes.node,
  attributes: PropTypes.object,
};

export default H3;
