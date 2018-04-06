import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {getArtist, getArticles} from '@/store/selectors/artists';
import {articleUrl} from '@/routes/routes';

import H2 from '@/components/simple/content/H2';
import H3 from '@/components/simple/content/H3';
import ArtistRender from '@/components/renders/Artist';
import ArticleDetails from '@/components/renders/Article/Details';

class Artist extends Component {
  render() {
    const {artist, articles} = this.props;
    return (
      <div>
        <ArtistRender artist={artist}/>
        <H2>Articles</H2>
        {
          articles.map((article, i) => (
            <div className="article-list" key={i}>
              <H3>
                <Link to={articleUrl(
                  artist.slug,
                  article.prefix,
                  article.slug
                )}>{article.title}</Link>
              </H3>
              <ArticleDetails
                article={article}
                author={article.user}/>
            </div>
          ))
        }
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
