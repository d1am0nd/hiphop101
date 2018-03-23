import React from 'react';
import PropTypes from 'prop-types';

const H2 = ({children, attributes}) => {
  return (
    <h2 {...attributes}>
      {children}
    </h2>
  );
};

H2.propTypes = {
  children: PropTypes.node,
  attributes: PropTypes.object,
};

export default H2;
