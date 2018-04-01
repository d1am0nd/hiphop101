import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {
  fetchArticle,
  likeArticle,
  unlikeArticle,
} from '@/store/actions/artists';
import {getArtist, getArticle, getArticleUser} from '@/store/selectors/artists';
import {getId} from '@/store/selectors/auth';

import hasAuthListener from '@/components/hoc/hasAuthListener';
import Article from '@/components/renders/Article';
import Like from '@/components/stateful/Like';

class ArtistArticle extends Component {
  constructor() {
    super();
    this.fetchData = this.fetchData.bind(this);
    this.authChangedHandler = this.authChangedHandler.bind(this);
  }

  fetchData() {
    const {
      artistSlug,
      prefix,
      articleSlug,
    } = this.props.match.params;

    this.props.fetchArticle(
      artistSlug,
      prefix,
      articleSlug
    );
  }

  authChangedHandler(e) {
    this.fetchData();
  }

  componentDidMount() {
    this.fetchData();
    this.props.addAuthListener(
      this.authChangedHandler
    );
  }

  render() {
    const {
      artist,
      article,
      articleUser,
      likeArticle,
      unlikeArticle,
      userId,
    } = this.props;
    const postLike = () => likeArticle(
      artist.slug, article.prefix, article.slug
    );
    const postUnlike = () => unlikeArticle(
      artist.slug, article.prefix, article.slug
    );
    return (
      <div>
        <Article article={article}/>
        <Like
          likesCount={article.likes_count}
          canLike={articleUser.id === userId}
          alreadyLiked={!!article.liked}
          postLike={postLike}
          postUnlike={postUnlike}/>
      </div>
    );
  }
}

ArtistArticle.propTypes = {
  match: PropTypes.object.isRequired,
  userId: PropTypes.number,
  articleUser: PropTypes.object,
  fetchArticle: PropTypes.func.isRequired,
  likeArticle: PropTypes.func.isRequired,
  unlikeArticle: PropTypes.func.isRequired,
  artist: PropTypes.object.isRequired,
  article: PropTypes.object.isRequired,

  addAuthListener: PropTypes.func.isRequired,
  // removeAuthListener: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    artist: getArtist(state),
    article: getArticle(state),
    articleUser: getArticleUser(state),
    userId: getId(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArticle: (
      artistSlug,
      prefix,
      articleSlug
    ) => dispatch(fetchArticle(
      artistSlug,
      prefix,
      articleSlug
    )),
    likeArticle: (
      artistSlug,
      prefix,
      articleSlug
    ) => dispatch(likeArticle(
      artistSlug,
      prefix,
      articleSlug
    )),
    unlikeArticle: (
      artistSlug,
      prefix,
      articleSlug
    ) => dispatch(unlikeArticle(
      artistSlug,
      prefix,
      articleSlug
    )),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(hasAuthListener(ArtistArticle)));
