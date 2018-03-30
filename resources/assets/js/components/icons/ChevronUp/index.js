import React from 'react';
import PropTypes from 'prop-types';

const ChevronUp = ({attributes}) => {
  return (
    <svg
      width="1792"
      height="1792"
      viewBox="0 0 1792 1792"
      xmlns="http://www.w3.org/2000/svg"
      {...attributes}>
      <path d="M1683 1331l-166 165q-19 19-45 19t-45-19l-531-531-531
      531q-19 19-45 19t-45-19l-166-165q-19-19-19-45.5t19-45.5l742-741q19-19
      45-19t45 19l742 741q19 19 19 45.5t-19 45.5z"/>
    </svg>
  );
};

ChevronUp.propTypes = {
  attributes: PropTypes.object,
};

export default ChevronUp;
