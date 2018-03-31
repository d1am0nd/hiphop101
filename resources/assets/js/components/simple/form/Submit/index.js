import React from 'react';
import PropTypes from 'prop-types';

const Submit = ({text, attributes}) => {
  return (
    <input
      {...attributes}
      value={text}
      type="submit"/>
  );
};

Submit.propTypes = {
  text: PropTypes.string.isRequired,
  attributes: PropTypes.object,
};

export default Submit;
