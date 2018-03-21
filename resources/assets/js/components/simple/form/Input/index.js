import React from 'react';
import PropTypes from 'prop-types';

import Label from '@/components/simple/form/Label';

const Input = ({
  attributes,
  handleChange,
  label,
}) => {
  return (
    <div className="form-group">
      {!!label ? <Label>{label}</Label> : null}
      <input
        {...attributes}
        onChange={(e) => handleChange(e)}/>
    </div>
  );
};

Input.propTypes = {
  attributes: PropTypes.object,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string,
};

export default Input;
