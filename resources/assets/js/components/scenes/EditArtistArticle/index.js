import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {myArticle, patchArticle} from '@/api/auth';
import {getErr, getData} from '@/api/helpers';
import hasSuccess from '@/components/hoc/hasSuccess';
import {
  values as artistValues,
} from '@/objects/artist';
import {
  values as articleValues,
  errors as articleErrors,
} from '@/objects/artist';
import ArticleForm from '@/components/forms/ArticleForm';
import Article from '@/components/renders/Article';

class EditArtistArticle extends Component {
  constructor() {
    super();
    this.state = {
      artist: {...artistValues},
      values: {...articleValues},
      errors: {...articleErrors},
    };
  }

  fetchData() {
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

  componentDidMount() {
    this.fetchData();
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

  handleSubmit(e, active) {
    e.preventDefault();
    const {id} = this.props.match.params;
    const {values} = this.state;
    values.active = !!active;

    patchArticle(id, values)
      .then((res) => {
        this.props.triggerSuccess(`Edited ${values.title}`);
        this.fetchData();
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
          <div>
            <ArticleForm
              article={values}
              errors={errors}
              handleChange={(e) => this.handleChange(e)}
              handlePublish={(e) => this.handleSubmit(e, true)}
              handleSaveDraft={(e) => this.handleSubmit(e, false)}/>
            <Article article={values}/>
          </div> : null
        }
      </div>
    );
  }
}

EditArtistArticle.propTypes = {
  match: PropTypes.object.isRequired,
  triggerSuccess: PropTypes.func.isRequired,
};

export default hasSuccess(
  withRouter(EditArtistArticle)
);
