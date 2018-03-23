import React from 'react';
import PropTypes from 'prop-types';

const H4 = ({children, attributes}) => {
  return (
    <h4 {...attributes}>
      {children}
    </h4>
  );
};

H4.propTypes = {
  children: PropTypes.node,
  attributes: PropTypes.object,
};

export default H4;
