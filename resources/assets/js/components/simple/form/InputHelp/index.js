import React from 'react';
import PropTypes from 'prop-types';

const InputHelp = ({children}) => {
  return (
    <div>
      {children}
    </div>
  );
};

InputHelp.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InputHelp;
