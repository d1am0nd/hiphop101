import React from 'react';
import PropTypes from 'prop-types';

import H1 from '@/components/simple/content/H1';
import Description from '@/components/simple/content/Description';
import HtmlContent from '@/components/simple/content/HtmlContent';

import {toHtml} from '@/marked';

const Article = ({article}) => {
  return (
    <div>
      <H1>{article.title}</H1>
      <Description>{article.description}</Description>
      <HtmlContent>{toHtml(article.content)}</HtmlContent>
    </div>
  );
};

Article.propTypes = {
  article: PropTypes.object.isRequired,
};

export default Article;
