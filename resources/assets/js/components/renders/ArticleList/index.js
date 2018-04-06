import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {articleUrl} from '@/routes/routes';

import ArticleDetails from '@/components/renders/Article/Details';
import ButtonList from '@/components/simple/content/ButtonList';
import H3 from '@/components/simple/content/H3';

const ArticleList = ({articles, artist}) => (
  <ul className="short-descriptions">
    {articles.map((article, i) => (
      <li key={i}>
        <H3>
          {article.title}
        </H3>
        <p>
          {article.description}
        </p>
        <ArticleDetails
          author={article.user}
          article={article}/>
        <ButtonList>
          {[
            <Link
              key={0}
              className="btn-inverse on-white"
              to={
                articleUrl(
                  (article.artist ? article.artist.slug : artist.slug),
                  article.prefix,
                  article.slug
                )
              }>
            Read
            </Link>,
          ]}
        </ButtonList>
      </li>
    ))}
  </ul>
);

ArticleList.propTypes = {
  articles: PropTypes.array.isRequired,
  artist: PropTypes.object,
};

export default ArticleList;
