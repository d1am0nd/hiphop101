import React from 'react';
import PropTypes from 'prop-types';

import H1 from '@/components/simple/content/H1';
import Description from '@/components/simple/content/Description';

const ArticleShort = ({article}) => {
  return (
    <div>
      <H1>{article.title}</H1>
      <Description>{article.description}</Description>
    </div>
  );
};

ArticleShort.propTypes = {
  article: PropTypes.object.isRequired,
};

export default ArticleShort;
