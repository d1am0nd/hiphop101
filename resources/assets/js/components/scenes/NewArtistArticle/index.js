import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {editArticleUrl} from '@/routes/routes';
import {findArtist, postNewArtistArticle} from '@/api/artists';
import {getErr, getData} from '@/api/helpers';
import hasEditor from '@/components/hoc/hasEditor';
import {
  values as articleValues,
  errors as articleErrors,
} from '@/objects/article';
import {
  values as artistValues,
} from '@/objects/artist';

import H1 from '@/components/simple/content/H1';
import ArticleForm from '@/components/forms/ArticleForm';
import Article from '@/components/renders/Article';

class NewArtistArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: {...artistValues},
      values: {...articleValues},
      errors: {...articleErrors},
    };
  }

  componentDidMount() {
    const {slug} = this.props.match.params;
    findArtist(slug)
      .then((res) => {
        this.setState({
          artist: getData(res),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSubmit(e, publish) {
    e.preventDefault();
    const {artist, values} = this.state;
    values.active = !!publish;

    if (!!publish) {
      window.confirm(
        `Are you sure you want to publish the article? ` +
        `Once published it can no longer be deleted or unpublished.`
      );
    }

    postNewArtistArticle(artist.slug, values)
      .then((res) => {
        this.props.history.push(
          editArticleUrl(getData(res).id)
        );
      })
      .catch((err) => {
        this.setState({
          errors: getErr(err),
        });
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

  render() {
    const {
      artist,
      values,
      errors,
    } = this.state;
    return (
      <div>
        <H1>New article for {artist.name}</H1>
        <ArticleForm
          article={values}
          errors={errors}
          handleChange={(e) => this.handleChange(e)}
          handlePublish={(e) => this.handleSubmit(e, true)}
          handleSaveDraft={(e) => this.handleSubmit(e, false)}/>
        <Article article={this.state.values}/>
      </div>
    );
  }
};

NewArtistArticle.propTypes = {
  editorStateToHtml: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default hasEditor(
  withRouter(
    NewArtistArticle
  )
);
