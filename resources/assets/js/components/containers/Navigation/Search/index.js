import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
  clearSearch,
  setSearchAndFetch as search,
} from '@/store/actions/sidesearch';

import Input from '@/components/simple/form/Input';
import Dropdown from './Dropdown';

class Search extends Component {
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

    if (target.value.length === 0) {
      this.props.clearSearch();
    } else {
      this.setState({
        timer: setTimeout(
          () => this.props.search(target.value),
          300
        ),
      });
    }
  }

  render() {
    return (
      <div className="search">
        <Input
          attributes={{
            tabIndex: 1,
          }}
          handleChange={(e) => this.handleChange(e)}
          type="search"
          name="Search"
          placeholder="Search..."/>
        <Dropdown
          className="hide"/>
      </div>
    );
  }
}

Search.propTypes = {
  search: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    search: (input) => dispatch(search(input)),
    clearSearch: () => dispatch(clearSearch()),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Search);
