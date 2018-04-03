import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {artistUrl} from '@/routes/routes';
import {
  likeArticle,
  unlikeArticle,
} from '@/store/actions/artists';
import {getArtist, getArticle, getArticleUser} from '@/store/selectors/artists';
import {getId} from '@/store/selectors/auth';

import Article from '@/components/renders/Article';
import Like from '@/components/stateful/Like';
import ChevronLeft from '@/components/icons/ChevronLeft';

class ArtistArticle extends Component {
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
    console.log('userId', userId);
    console.log(articleUser.id);
    return (
      <div>
        <Link to={artistUrl(artist.slug)} className="back-to-artist">
          <ChevronLeft/>
          {artist.name}
        </Link>
        <Article article={article}/>
        <Like
          likesCount={article.likes_count}
          canLike={
            userId === 0 ||
            articleUser.id != userId
          }
          alreadyLiked={!!article.liked}
          postLike={postLike}
          postUnlike={postUnlike}/>
      </div>
    );
  }
}

ArtistArticle.propTypes = {
  userId: PropTypes.number,
  articleUser: PropTypes.object,
  likeArticle: PropTypes.func.isRequired,
  unlikeArticle: PropTypes.func.isRequired,
  artist: PropTypes.object.isRequired,
  article: PropTypes.object.isRequired,
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
  )(ArtistArticle));
