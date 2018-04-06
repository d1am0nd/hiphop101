import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {articleUrl} from '@/routes/routes';
import {getPopularArticles} from '@/store/selectors/popular';

import H1 from '@/components/simple/content/H1';
import H2 from '@/components/simple/content/H2';
import H3 from '@/components/simple/content/H3';
import Description from '@/components/simple/content/Description';
import ArticleDetails from '@/components/renders/Article/Details';

const Home = ({articles}) => {
  return (
    <div className="homepage">
      <H1>Home</H1>
      <Description>
        Hip Hop 101 is a platform dedicated to writing quality, positive,
        opinionated introductions to all kinds of hip hop artists, groups
        and associated acts.
      </Description>
      <H2>Popular articles</H2>
      {
        articles.map((article, i) => (
          <div className="article-list" key={i}>
            <H3>
              <Link to={articleUrl(
                article.artist.slug,
                article.prefix,
                article.slug
              )}>{article.title}</Link>
            </H3>
            <ArticleDetails
              article={article}
              artist={article.artist}
              author={article.user}/>
          </div>
        ))
      }
    </div>
  );
};

Home.propTypes = {
  articles: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    articles: getPopularArticles(state),
  };
};

export default connect(
  mapStateToProps
)(Home);
