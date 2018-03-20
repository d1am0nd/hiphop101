import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {searchByName} from '@/api/artists';
import {getData} from '@/api/helpers';

import Input from '@/components/simple/form/Input';
import Dropdown from './Dropdown';

class ArtistSearch extends Component {
  constructor() {
    super();
    this.state = {
      timer: null,
      artists: [],
    };
  }

  handleChange(e) {
    const {target} = e;
    const {timer} = this.state;

    clearTimeout(timer);

    this.setState({
      timer: setTimeout(
        () => searchByName(target.value)
          .then((res) => {
            this.setState({
              artists: getData(res),
            });
          })
          .catch((err) => {
            console.log('err');
          }),
        300
      ),
    });
  }

  render() {
    return (
      <div className="artist-search">
        <Input
          handleChange={(e) => this.handleChange(e)}
          type="search"
          name="Search"
          placeholder="Search artist..."/>
        <Dropdown
          handleArtistClick={
            (e, artist) => this.props.handleArtistClick(e, artist)
          }
          show={this.props.showDropdown}
          artists={this.state.artists}/>
      </div>
    );
  }
}

ArtistSearch.propTypes = {
  handleArtistClick: PropTypes.func.isRequired,
  showDropdown: PropTypes.bool,
};

export default ArtistSearch;
