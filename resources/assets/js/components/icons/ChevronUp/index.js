import React from 'react';
import PropTypes from 'prop-types';

const ChevronUp = ({attributes}) => {
  return (
    /*
    <svg
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      {...attributes}>
      <path
        d="M240.971 130.524l194.343
        194.343c9.373 9.373 9.373 24.569 0
        33.941l-22.667 22.667c-9.357
        9.357-24.522 9.375-33.901.04L224
        227.495 69.255 381.516c-9.379 9.335-24.544
        9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569
        0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z">
      </path>
    </svg>
    */
    <svg
      width="1792"
      height="1792"
      viewBox="0 0 1792 1792"
      xmlns="http://www.w3.org/2000/svg">
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
