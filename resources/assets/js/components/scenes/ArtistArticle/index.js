import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {findArticle} from '@/api/artists';
import {getData, getParent} from '@/api/helpers';

import Article from '@/components/renders/Article';

class ArtistArticle extends Component {
  constructor() {
    super();
    this.state = {
      artist: {
        name: '',
        description: '',
      },
      article: {
        title: '',
        description: '',
        content: '',
      },
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
    const {article} = this.state;
    return (
      <div>
        <Article article={article}/>
      </div>
    );
  }
}

ArtistArticle.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withRouter(ArtistArticle);
