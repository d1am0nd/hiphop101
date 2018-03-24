import React from 'react';
import PropTypes from 'prop-types';

const Description = ({children}) => {
  return (
    <div className="description">
      {children}
    </div>
  );
};

Description.propTypes = {
  children: PropTypes.node,
};

export default Description;
