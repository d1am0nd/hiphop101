import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
  getPopularArticles,
  getArticlesNextPage as nextPage,
  getArticlesPrevPage as prevPage,
} from '@/store/selectors/popular';

import H1 from '@/components/simple/content/H1';
import H2 from '@/components/simple/content/H2';
import Pagination from '@/components/simple/pagination/Simple';
import Description from '@/components/simple/content/Description';
import ArticleList from '@/components/renders/ArticleList';

const Home = ({articles, nextPage, prevPage}) => (
  <div className="homepage">
    <H1>Home</H1>
    <Description>
      Hip Hop 101 is a platform dedicated to writing quality, positive,
      opinionated introductions to all kinds of hip hop artists, groups
      and associated acts.
    </Description>
    <H2>Popular articles</H2>
    <ArticleList articles={articles}/>
    <Pagination prev={prevPage} next={nextPage}/>
  </div>
);

Home.propTypes = {
  articles: PropTypes.array.isRequired,
  nextPage: PropTypes.number,
  prevPage: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    articles: getPopularArticles(state),
    nextPage: nextPage(state),
    prevPage: prevPage(state),
  };
};

export default connect(
  mapStateToProps
)(Home);
