import React from 'react';
import PropTypes from 'prop-types';

const H1 = ({children}) => {
  return (
    <h1>
      {children}
    </h1>
  );
};

H1.propTypes = {
  children: PropTypes.node,
};

export default H1;
