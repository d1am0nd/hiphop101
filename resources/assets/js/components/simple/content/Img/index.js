import React from 'react';
import PropTypes from 'prop-types';

const Img = ({src, attributes}) => (
  <img
    {...attributes}
    src={src}/>
);

Img.propTypes = {
  src: PropTypes.string,
  attributes: PropTypes.object,
};

export default Img;
