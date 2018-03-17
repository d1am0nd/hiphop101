import React from 'react';
import PropTypes from 'prop-types';

const Submit = ({text}) => {
  return (
    <input
      value={text}
      type="submit"/>
  );
};

Submit.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Submit;
