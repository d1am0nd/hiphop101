import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {searchByName} from '@/api/artists';
import {getData} from '@/api/helpers';

import Input from '@/components/simple/form/Input';

class ArtistSearch extends Component {
  constructor() {
    super();
    this.state = {
      timer: null,
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
            this.props.handleListChange(getData(res));
          })
          .catch((err) => {
            console.log(err);
          }),
        this.props.timer ? this.props.timer : 300
      ),
    });
  }

  render() {
    return (
      <Input
        {...this.props.inputProps}
        handleChange={(e) => this.handleChange(e)}/>
    );
  }
}

ArtistSearch.propTypes = {
  handleListChange: PropTypes.func.isRequired,
  inputProps: PropTypes.object,
  timer: PropTypes.number,
};

export default ArtistSearch;
