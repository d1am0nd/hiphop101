import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {postNewArtist} from '@/api/artists';
import {getErr, getData} from '@/api/helpers';
import {newArtistArticleUrl} from '@/routes/routes';
import {values, errors} from '@/objects/artist';

import H1 from '@/components/simple/content/H1';
import ArtistForm from '@/components/forms/ArtistForm';

class NewArtist extends Component {
  constructor() {
    super();
    this.state = {
      values: {...values},
      errors: {...errors},
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const {values, errors} = this.state;
    const {history} = this.props;
    postNewArtist(values)
      .then((res) => {
        history.push(newArtistArticleUrl(getData(res).slug));
      })
      .catch((err) => {
        this.setState({
          errors: {
            ...errors,
            ...getErr(err),
          },
        });
      });
  }

  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      values: {
        ...this.state.values,
        [name]: value,
      },
    });
  }

  render() {
    const {values, errors} = this.state;
    return (
      <div>
        <H1>Add an artist</H1>
        <ArtistForm
          artist={values}
          errors={errors}
          handleChange={(e) => this.handleChange(e)}
          handleSubmit={(e) => this.handleSubmit(e)}/>
      </div>
    );
  }
}

NewArtist.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(NewArtist);
