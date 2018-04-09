import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {
  getArtist,
  getArticles,
  getArticlesNextPage as nextPage,
  getArticlesPrevPage as prevPage,
} from '@/store/selectors/artists';

import H2 from '@/components/simple/content/H2';
import ArtistRender from '@/components/renders/Artist';
import ArticleList from '@/components/renders/ArticleList';
import Pagination from '@/components/simple/pagination/Simple';

const Artist = ({artist, articles, prevPage, nextPage}) => (
  <div>
    <ArtistRender artist={artist}/>
    <H2>Articles</H2>
    <ArticleList articles={articles}/>
    <Pagination prev={prevPage} next={nextPage}/>
  </div>
);

Artist.propTypes = {
  artist: PropTypes.object.isRequired,
  articles: PropTypes.array.isRequired,
  prevPage: PropTypes.number,
  nextPage: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    artist: getArtist(state),
    articles: getArticles(state),
    prevPage: prevPage(state),
    nextPage: nextPage(state),
  };
};
export default connect(
  mapStateToProps
)(withRouter(Artist));
