import React from 'react';
import PropTypes from 'prop-types';

const BututonList = ({children}) => {
  return (
    <ul className="button-list">
      {children.map((btn, i) => (
        <li key={i}>{btn}</li>
      ))}
    </ul>
  );
};

BututonList.propTypes = {
  children: PropTypes.array.isRequired,
};

export default BututonList;
