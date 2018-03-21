import React from 'react';
import PropTypes from 'prop-types';

import Label from '@/components/simple/form/Label';

const TextArea = ({handleChange, attributes, label}) => {
  return (
    <div className="form-group">
      {!!label ? <Label>{label}</Label> : null}
      <textarea
        onChange={(e) => handleChange(e)}
        {...attributes}/>
    </div>
  );
};

TextArea.propTypes = {
  label: PropTypes.string,
  attributes: PropTypes.object,
  handleChange: PropTypes.func.isRequired,
};

export default TextArea;
