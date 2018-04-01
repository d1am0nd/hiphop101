import React from 'react';
import PropTypes from 'prop-types';

const path = 'M1427 301l-531 531 531 531q19 19 19 ' +
  '45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-' +
  '19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z';

const ChevronUp = ({attributes}) => {
  return (
    <svg
      width="1792"
      height="1792"
      viewBox="0 0 1792 1792"
      xmlns="http://www.w3.org/2000/svg"
      {...attributes}>
      <path d={path}/>
    </svg>
  );
};

ChevronUp.propTypes = {
  attributes: PropTypes.object,
};

export default ChevronUp;
