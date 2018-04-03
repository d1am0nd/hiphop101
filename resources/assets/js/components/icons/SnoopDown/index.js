import React from 'react';
import PropTypes from 'prop-types';

const SnoopDown = (props) => {
  return (
    <img
      {...props}
      alt="Mad Snoop"
      title="Vote"
      src="/img/icons/SnoopDown50.png"/>
  );
};

SnoopDown.propTypes = {
  attributes: PropTypes.object,
};

export default SnoopDown;
