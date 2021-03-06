import React from 'react';
import PropTypes from 'prop-types';

const H1 = ({children, attributes}) => {
  return (
    <h1 {...attributes}>
      {children}
    </h1>
  );
};

H1.propTypes = {
  children: PropTypes.node,
  attributes: PropTypes.object,
};

export default H1;
