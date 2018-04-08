import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {articleUrl} from '@/routes/routes';

import ArticleDetails from '@/components/renders/Article/Details';
import H3 from '@/components/simple/content/H3';

const ArticleList = ({
  articles,
  bottomContent,
}) => (
  <ul className="article-list">
    {articles.map((article, i) => (
      <li key={i}>
        <H3>
          {
            article.active === 1 ?
              <Link to={articleUrl(
                article.artist.slug,
                article.prefix,
                article.slug
              )}>
                {article.title}
              </Link> :
              article.title
          }
        </H3>
        <ArticleDetails
          article={article}
          artist={article.artist}
          author={article.user}/>
        {
          bottomContent ?
            bottomContent(article, i) : null
        }
      </li>
    ))}
  </ul>
);

ArticleList.propTypes = {
  articles: PropTypes.array.isRequired,
  bottomContent: PropTypes.func,
};

export default ArticleList;
