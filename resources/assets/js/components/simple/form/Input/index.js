import React from 'react';
import PropTypes from 'prop-types';

import Label from './Label';

const Input = ({
  type,
  handleChange,
  placeholder,
  name,
  label,
  autoFocus,
}) => {
  return (
    <div className="form-group">
      {!!label ? <Label>{label}</Label> : null}
      <input
        onChange={(e) => handleChange(e)}
        type={type ? type : 'text'}
        name={name}
        autoFocus={!!autoFocus}
        placeholder={placeholder}/>
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool,

  label: PropTypes.string,
};

export default Input;
