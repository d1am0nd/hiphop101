import React from 'react';
import PropTypes from 'prop-types';

import H1 from '@/components/simple/content/H1';
import HtmlContent from '@/components/simple/content/HtmlContent';
import Details from './Details';

import {toHtml} from '@/marked';

const Article = ({article}) => {
  return (
    <div>
      <H1>{article.title}</H1>
      <HtmlContent>{toHtml(article.content)}</HtmlContent>
      <Details article={article}/>
    </div>
  );
};

Article.propTypes = {
  article: PropTypes.object.isRequired,
};

export default Article;
