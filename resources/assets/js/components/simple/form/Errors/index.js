import React from 'react';
import PropTypes from 'prop-types';

const Errors = ({errors}) => {
  return (
    <ul>
      {errors.map((err) => (
        <li key={err}>
          {err}
        </li>
      ))}
    </ul>
  );
};

Errors.propTypes = {
  errors: PropTypes.array.isRequired,
};

export default Errors;
