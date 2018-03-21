import React from 'react';
import PropTypes from 'prop-types';

const Label = ({children}) => {
  return (
    <label>
      {children}
    </label>
  );
};

Label.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Label;
