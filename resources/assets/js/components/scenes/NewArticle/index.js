import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {newArtistUrl} from '@/routes/routes';

import H1 from '@/components/simple/content/H1';
import ArtistSearch from '@/components/stateful/ArtistSearch';
import List from './List';

class NewArticle extends Component {
  constructor() {
    super();
    this.state = {
      artists: [],
    };
  }

  handleListChange(artists) {
    this.setState({
      artists: artists,
    });
  }

  render() {
    return (
      <div className="list-content">
        <H1>New article</H1>

        <Link className="cta" to={newArtistUrl()}>
          Add an artist
        </Link>

        <ArtistSearch
          inputProps={{
            attributes: {
              placeholder: 'Search...',
              name: 'search',
              id: 'content-search-input',
              autoFocus: true,
            },
          }}
          handleListChange={(artists) => this.handleListChange(artists)}/>
        <List artists={this.state.artists}/>
      </div>
    );
  }
};

export default NewArticle;
