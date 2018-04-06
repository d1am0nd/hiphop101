import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {getPopularArticles} from '@/store/selectors/popular';

import H1 from '@/components/simple/content/H1';
import H2 from '@/components/simple/content/H2';
import Description from '@/components/simple/content/Description';
import ArticleList from '@/components/renders/ArticleList';

const Home = ({articles}) => {
  return (
    <div>
      <H1>Home</H1>
      <Description>
        Hip Hop 101 is a platform dedicated to writing quality, positive,
        opinionated introductions to all kinds of hip hop artists, groups
        and associated acts.
      </Description>
      <H2>Popular articles</H2>
      <ArticleList articles={articles}/>
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
