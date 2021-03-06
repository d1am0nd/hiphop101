import React, {Component} from 'react';

import ArtistSearch from '@/components/stateful/ArtistSearch';
import Dropdown from './Dropdown';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
    };
  }

  handleArtistClick(e) {
    document.getElementById('nav-search-input').value = '';
    this.setState({
      list: [],
    });
  }

  handleListChange(list) {
    this.setState({
      list: list,
    });
  }

  render() {
    return (
      <div className="search">
        <ArtistSearch
          inputProps={{
            attributes: {
              name: 'search',
              placeholder: 'Search...',
              id: 'nav-search-input',
              tabIndex: 1,
              title: 'Search artists',
            },
          }}
          handleListChange={(list) => this.handleListChange(list)}/>
        <Dropdown
          handleClick={(e) => this.handleArtistClick(e)}
          artists={this.state.list}/>
      </div>
    );
  }
}

export default Search;
