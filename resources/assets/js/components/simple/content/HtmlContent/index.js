import React from 'react';
import PropTypes from 'prop-types';

const HtmlContent = ({children}) => {
  return (
    <div dangerouslySetInnerHTML={{
      __html: children,
    }}/>
  );
};

HtmlContent.propTypes = {
  children: PropTypes.node,
};

export default HtmlContent;
