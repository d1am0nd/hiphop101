import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {searchByName} from '@/api/artists';
import {getData} from '@/api/helpers';

import hasTimeouts from '@/components/hoc/hasTimeouts';
import Input from '@/components/simple/form/Input';

class ArtistSearch extends Component {
  fetchList(name) {
    if (name.length === 0) {
      this.props.handleListChange([]);
    } else {
      searchByName(name)
        .then((res) => {
          this.props.handleListChange(getData(res));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  handleChange(e) {
    const {target} = e;
    this.props.clearTimeouts();
    this.props.addTimeout(
      () => this.fetchList(target.value),
      this.props.timer ? this.props.timer : 300
    );
  }

  componentWillUnmount() {
    this.props.clearTimeouts();
  }

  render() {
    return (
      <Input
        {...this.props.inputProps}
        attributes={{
          type: 'search',
          ...this.props.inputProps.attributes,
        }}
        handleChange={(e) => this.handleChange(e)}/>
    );
  }
}

ArtistSearch.propTypes = {
  handleListChange: PropTypes.func.isRequired,
  inputProps: PropTypes.object,
  timer: PropTypes.number,

  addTimeout: PropTypes.func.isRequired,
  clearTimeouts: PropTypes.func.isRequired,
};

export default hasTimeouts(ArtistSearch);
