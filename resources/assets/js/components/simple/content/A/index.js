import React from 'react';
import PropTypes from 'prop-types';

const A = ({href, title, children, attributes}) => {
  return (
    <a href={href} title={title} {...attributes}>
      {children}
    </a>
  );
};

A.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  attributes: PropTypes.object,
};

export default A;
