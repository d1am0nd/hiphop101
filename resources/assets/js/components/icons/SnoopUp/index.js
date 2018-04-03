import React from 'react';
import PropTypes from 'prop-types';

const SnoopUp = (props) => {
  return (
    <img
      {...props}
      alt="Happy Snoop"
      title="Unvote"
      src="/img/icons/SnoopUp50.png"/>
  );
};

SnoopUp.propTypes = {
  attributes: PropTypes.object,
};

export default SnoopUp;
