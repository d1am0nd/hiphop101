import React from 'react';
import PropTypes from 'prop-types';

import H2 from '@/components/simple/content/H2';

const Section = ({title, children}) => {
  return (
    <div className="content-section">
      <div className="section-title">
        <H2>{title}</H2>
      </div>
      <div className="section-content">
        {children}
      </div>
    </div>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Section;
