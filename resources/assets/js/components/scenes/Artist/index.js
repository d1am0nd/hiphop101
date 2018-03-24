import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

import {getData, getParent} from '@/api/helpers';
import {getArtistArticles} from '@/api/artists';
import {articleUrl} from '@/routes/routes';

import ArtistRender from '@/components/renders/Artist';
import H2 from '@/components/simple/content/H2';
import Description from '@/components/simple/content/Description';

class Artist extends Component {
  constructor() {
    super();
    this.state = {
      artist: {},
      articles: [],
    };
  }

  componentDidMount() {
    const {slug} = this.props.match.params;
    getArtistArticles(slug)
      .then((res) => {
        this.setState({
          artist: getParent(res),
          articles: getData(res),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {artist, articles} = this.state;
    return (
      <div>
        <ArtistRender artist={artist}/>
        <ul className="short-descriptions">
          {articles.map((article, i) => (
            <li key={i}>
              <H2>
                {article.title}
              </H2>
              <Description>
                {article.description}
              </Description>
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
};

export default withRouter(Artist);
