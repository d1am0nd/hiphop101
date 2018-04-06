import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {articleUrl} from '@/routes/routes';
import {getArtist, getArticles} from '@/store/selectors/artists';

import ArticleDetails from '@/components/renders/Article/Details';
import ArtistRender from '@/components/renders/Artist';
import ButtonList from '@/components/simple/content/ButtonList';
import Like from '@/components/stateful/Like';
import H2 from '@/components/simple/content/H2';

class Artist extends Component {
  render() {
    const {artist, articles} = this.props;
    return (
      <div>
        <ArtistRender artist={artist}/>
        <ul className="short-descriptions">
          {articles.map((article, i) => (
            <li key={i}>
              <H2>
                {article.title}
              </H2>
              <p>
                {article.description}
              </p>
              <ArticleDetails article={article}/>
              <Like
                canLike={false}
                likesCount={article.likes_count}/>
              <ButtonList>
                {[
                  <Link
                    key={0}
                    className="btn-inverse on-white"
                    to={
                      articleUrl(artist.slug, article.prefix, article.slug)
                    }>
                  Read
                  </Link>,
                ]}
              </ButtonList>
            </li>
          ))}
        </ul>
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
