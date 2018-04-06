import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {getArtist, getArticles} from '@/store/selectors/artists';

import H2 from '@/components/simple/content/H2';
import ArtistRender from '@/components/renders/Artist';
import ArticleList from '@/components/renders/ArticleList';

class Artist extends Component {
  render() {
    const {artist, articles} = this.props;
    return (
      <div>
        <ArtistRender artist={artist}/>
        <H2>Articles</H2>
        <ArticleList
          articles={articles}
          artist={artist}/>
      </div>
    );
  }
}

Artist.propTypes = {
  artist: PropTypes.object.isRequired,
  articles: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    artist: getArtist(state),
    articles: getArticles(state),
  };
};
export default connect(
  mapStateToProps
)(withRouter(Artist));
