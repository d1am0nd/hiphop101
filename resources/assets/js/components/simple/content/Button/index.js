import React from 'react';
import PropTypes from 'prop-types';

const Button = ({children, handleClick, attributes}) => {
  return (
    <button
      {...attributes}
      onClick={(e) => handleClick(e)}
      className="cta">
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  handleClick: PropTypes.func.isRequired,
  attributes: PropTypes.object,
};

export default Button;
