import React from 'react';
import PropTypes from 'prop-types';

import Label from '@/components/simple/form/Label';
import Errors from '@/components/simple/form/Errors';
import InputHelp from '@/components/simple/form/InputHelp';

const TextArea = ({handleChange, attributes, label, errors, help}) => {
  return (
    <div className="form-group">
      {!!label ? <Label>{label}</Label> : null}
      <textarea
        onChange={(e) => handleChange(e)}
        {...attributes}/>
      {help ? <InputHelp>{help}</InputHelp> : null}
      {errors ? <Errors errors={errors}/> : null}
    </div>
  );
};

TextArea.propTypes = {
  label: PropTypes.string,
  attributes: PropTypes.object,
  handleChange: PropTypes.func.isRequired,
  help: PropTypes.node,
  errors: PropTypes.array,
};

export default TextArea;
