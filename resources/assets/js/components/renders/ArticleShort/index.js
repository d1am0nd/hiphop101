import React from 'react';
import PropTypes from 'prop-types';

import H3 from '@/components/simple/content/H3';
import Description from '@/components/simple/content/Description';

const ArticleShort = ({article}) => {
  return (
    <div>
      <H3>{article.title}</H3>
      <Description>{article.description}</Description>
    </div>
  );
};

ArticleShort.propTypes = {
  article: PropTypes.object.isRequired,
};

export default ArticleShort;
