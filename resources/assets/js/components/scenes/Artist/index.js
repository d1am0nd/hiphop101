import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {articleUrl} from '@/routes/routes';
import {getArtist, getArticles} from '@/store/selectors/artists';
import {fetchArtistWithArticles} from '@/store/actions/artists';

import ArtistRender from '@/components/renders/Artist';
import H2 from '@/components/simple/content/H2';

class Artist extends Component {
  fetchData() {
    const {slug} = this.props.match.params;
    this.props.fetchArticles(slug);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.fetchData();
    }
  }

  componentDidMount() {
    this.fetchData();
  }

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
              <div>
                <Link to={
                  articleUrl(artist.slug, article.prefix, article.slug)
                }>
                More
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Artist.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  artist: PropTypes.object.isRequired,
  articles: PropTypes.array.isRequired,
  fetchArticles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    artist: getArtist(state),
    articles: getArticles(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArticles: (slug) => dispatch(fetchArtistWithArticles(slug)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Artist));
