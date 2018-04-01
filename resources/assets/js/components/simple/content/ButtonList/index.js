import React from 'react';
import PropTypes from 'prop-types';

const ButtonList = ({children}) => {
  return (
    <ul className="button-list">
      {children.map((btn, i) => (
        <li key={i}>{btn}</li>
      ))}
    </ul>
  );
};

ButtonList.propTypes = {
  children: PropTypes.array.isRequired,
};

export default ButtonList;
