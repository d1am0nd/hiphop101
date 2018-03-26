import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {findArticle, likeArticle} from '@/api/artists';
import {getData, getParent} from '@/api/helpers';
import {
  values as artistValues,
} from '@/objects/artist';
import {
  values as articleValues,
} from '@/objects/article';

import Article from '@/components/renders/Article';
import Like from '@/components/stateful/Like';

class ArtistArticle extends Component {
  constructor() {
    super();
    this.state = {
      artist: {...artistValues},
      article: {...articleValues},
    };
  }

  componentDidMount() {
    const {
      artistSlug,
      prefix,
      articleSlug,
    } = this.props.match.params;

    findArticle(artistSlug, prefix, articleSlug)
      .then((res) => {
        this.setState({
          artist: getParent(res),
          article: getData(res),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {artist, article} = this.state;
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
          alreadyLiked={!!article.liked}
          postLike={postLike}
          handleLike={(res) => this.handleLike(res)}
          postUnlike={postUnlike}
          handleUnlike={(res) => this.handleUnlike(res)}/>
      </div>
    );
  }
}

ArtistArticle.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withRouter(ArtistArticle);
