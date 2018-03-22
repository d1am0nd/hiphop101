import React from 'react';
import PropTypes from 'prop-types';

import Label from '@/components/simple/form/Label';
import Errors from '@/components/simple/form/Errors';
import InputHelp from '@/components/simple/form/InputHelp';

const Input = ({
  attributes,
  handleChange,
  label,
  help,
  errors,
}) => {
  return (
    <div className="form-group">
      {!!label ? <Label>{label}</Label> : null}
      <input
        {...attributes}
        onChange={(e) => handleChange(e)}/>
      {help ? <InputHelp>{help}</InputHelp> : null}
      {errors ? <Errors errors={errors}/> : null}
    </div>
  );
};

Input.propTypes = {
  attributes: PropTypes.object,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  help: PropTypes.node,
  errors: PropTypes.array,
};

export default Input;
