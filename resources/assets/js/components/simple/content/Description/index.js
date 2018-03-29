import React from 'react';
import PropTypes from 'prop-types';

const Description = ({children}) => {
  return (
    <p className="description">
      {children}
    </p>
  );
};

Description.propTypes = {
  children: PropTypes.node,
};

export default Description;
