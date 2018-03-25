import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {myArticle, patchArticle} from '@/api/auth';
import {getErr, getData} from '@/api/helpers';
import {
  values as artistValues,
} from '@/objects/artist';
import {
  values as articleValues,
  errors as articleErrors,
} from '@/objects/artist';
import ArticleForm from '@/components/forms/ArticleForm';

class EditArtistArticle extends Component {
  constructor() {
    super();
    this.state = {
      artist: {...artistValues},
      values: {...articleValues},
      errors: {...articleErrors},
    };
  }

  componentDidMount() {
    const {id} = this.props.match.params;
    myArticle(id)
      .then((res) => {
        this.setState({
          values: getData(res),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange(e) {
    const {target} = e;
    this.setState({
      values: {
        ...this.state.values,
        [target.name]: target.value,
      },
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const {id} = this.props.match.params;
    patchArticle(id, this.state.values)
      .then((res) => {
        console.log(getData(res));
      })
      .catch((err) => {
        this.setState({
          errors: getErr(err),
        });
      });
  }

  render() {
    const {
      values,
      errors,
    } = this.state;
    return (
      <div>
        {typeof values.id !== 'undefined' ?
          <ArticleForm
            article={values}
            errors={errors}
            handleChange={(e) => this.handleChange(e)}
            handleSubmit={(e) => this.handleSubmit(e)}/> : null
        }
      </div>
    );
  }
}

EditArtistArticle.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withRouter(EditArtistArticle);
