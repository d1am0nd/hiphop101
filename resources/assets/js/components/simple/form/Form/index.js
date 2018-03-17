import React from 'react';
import PropTypes from 'prop-types';

const Form = ({handleSubmit, children}) => {
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {children}
    </form>
  );
};

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Form;
