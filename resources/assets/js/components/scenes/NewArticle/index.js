import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import H1 from '@/components/simple/content/H1';
import Input from '@/components/simple/form/Input';

class NewArticle extends Component {
  constructor() {
    super();
    this.state = {
      timer: null,
    };
  }

  handleChange(e) {
    const {target} = e;
    const {timer} = this.state;

    console.log('change', target.value);

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
      <div>
        <H1>New article</H1>
        Choose artist
        <Input
          type="search"
          handleChange={(e) => this.handleChange(e)}
          placeholder="Find artist"
          name="artist"/>
        <div
          onClick={(e) => handleArtistChange(e, 'test')}>
          change
        </div>
      </div>
    );
  }
};

NewArticle.propTypes = {
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
)(NewArticle);
